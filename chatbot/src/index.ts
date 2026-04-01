import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import OpenAI from 'openai';
import { buildKnowledgeContext, parseKnowledgeSections } from './knowledge';

type ChatHistoryEntry = { role: 'user' | 'assistant'; content: string };
type EnvBindings = {
    ASSETS: Fetcher;
    FRONTEND_URL?: string;
    OPENROUTER_API_KEY: string;
    OPENROUTER_MODEL?: string;
    SITE_URL?: string;
};

const app = new Hono<{ Bindings: EnvBindings }>();

// In-memory session storage (Workers global scope)
const sessions = new Map<string, ChatHistoryEntry[]>();
const requestCounts = new Map<string, number[]>();
let knowledgeSectionsCache: ReturnType<typeof parseKnowledgeSections> | null = null;

// Constants
const RATE_LIMIT = 100;
const RATE_WINDOW = 15 * 60 * 1000; // 15 minutes

const KB_MISS_RESPONSE =
    'That is not covered in the current public knowledge base yet. For anything commercial or project-specific, please contact connect@orkait.com.';
const SYSTEM_RULES = `You are the Orkait knowledge assistant.

Rules:
- Answer only from the provided knowledge base context.
- If the answer is not in the provided context, say so plainly.
- Do not mention archived projects as active work.
- Do not invent timelines, features, customers, or roadmap details.
- Keep answers concise by default.
- If asked about pricing, custom quotes, or commercial engagement details, direct the user to connect@orkait.com.`;

async function getKnowledgeSections(env: { ASSETS?: Fetcher }) {
    if (knowledgeSectionsCache) {
        return knowledgeSectionsCache;
    }

    const response = await env.ASSETS?.fetch('https://knowledge.internal/index.md');

    if (!response?.ok) {
        throw new Error('Knowledge base asset is unavailable');
    }

    const markdown = await response.text();
    knowledgeSectionsCache = parseKnowledgeSections(markdown);
    return knowledgeSectionsCache;
}

function buildMessages(
    knowledgeSections: ReturnType<typeof parseKnowledgeSections>,
    message: string,
    history: ChatHistoryEntry[]
) {
    const knowledgeContext = buildKnowledgeContext(knowledgeSections, message, 4);

    if (!knowledgeContext) {
        return null;
    }

    return [
        {
            role: 'system' as const,
            content: `${SYSTEM_RULES}\n\nKnowledge Base Context:\n${knowledgeContext}`,
        },
        ...history.slice(-8),
        { role: 'user' as const, content: message },
    ];
}

// Middleware
app.use('*', logger());
app.use('*', prettyJSON());
app.use('*', cors({
    origin: (origin) => origin, // Allow all origins in Workers, or specify your domain
    credentials: true,
}));

// Rate limiting function
function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const userRequests = requestCounts.get(ip) || [];

    // Clean old requests
    const recentRequests = userRequests.filter((time: number) => now - time < RATE_WINDOW);

    if (recentRequests.length >= RATE_LIMIT) {
        return false;
    }

    recentRequests.push(now);
    requestCounts.set(ip, recentRequests);
    return true;
}

// Cleanup function
let lastCleanup = Date.now();
function cleanupOldSessions() {
    const now = Date.now();
    const ONE_HOUR = 3600000;

    if (now - lastCleanup > ONE_HOUR) {
        const sizeBefore = sessions.size;
        sessions.clear();
        requestCounts.clear();
        lastCleanup = now;
        console.log(`🧹 Cleaned up ${sizeBefore} sessions and rate limit data`);
    }
}

// Routes
app.get('/health', (c) => {
    return c.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        platform: 'Cloudflare Workers',
        framework: 'Hono.js',
    });
});

app.post('/api/chatbot/chat', async (c) => {
    try {
        const env = c.env;
        const knowledgeSections = await getKnowledgeSections(env);

        // Initialize OpenRouter client with env vars
        const openai = new OpenAI({
            apiKey: env.OPENROUTER_API_KEY,
            baseURL: 'https://openrouter.ai/api/v1',
            defaultHeaders: {
                'HTTP-Referer': env.SITE_URL || 'https://orkait.com',
                'X-Title': 'Orkait Chatbot',
            },
        });

        // Rate limiting
        const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
        if (!checkRateLimit(ip)) {
            return c.json({ error: 'Too many requests. Please try again later.' }, 429);
        }

        const body = await c.req.json<{ message?: string; sessionId?: string }>();
        const { message, sessionId } = body;

        // Validation
        if (!message || typeof message !== 'string') {
            return c.json({ error: 'Valid message is required' }, 400);
        }

        if (!sessionId || typeof sessionId !== 'string') {
            return c.json({ error: 'Valid sessionId is required' }, 400);
        }

        if (message.length > 1000) {
            return c.json({ error: 'Message too long (max 1000 characters)' }, 400);
        }

        // Get or create session history
        let history = sessions.get(sessionId) || [];
        const messages = buildMessages(knowledgeSections, message, history);

        if (!messages) {
            return c.json({
                response: KB_MISS_RESPONSE,
                sessionId,
                timestamp: new Date().toISOString(),
                tokensUsed: 0,
            });
        }

        // Call OpenRouter
        const completion = await openai.chat.completions.create({
            model: env.OPENROUTER_MODEL || 'openai/gpt-3.5-turbo',
            messages,
            max_tokens: 220,
            temperature: 0.2,
            presence_penalty: 0,
            frequency_penalty: 0,
        });

        const aiResponse =
            completion.choices[0].message.content?.trim() ||
            'That is not covered in the current public knowledge base yet.';

        // Update history (keep last 10 exchanges = 20 messages)
        history = [
            ...history,
            { role: 'user' as const, content: message },
            { role: 'assistant' as const, content: aiResponse },
        ].slice(-20);

        sessions.set(sessionId, history);

        // Periodic cleanup
        cleanupOldSessions();

        console.log(`[${sessionId.substring(0, 8)}...] User: "${message.substring(0, 50)}..."`);
        if (aiResponse != null) {
            console.log(`[${sessionId.substring(0, 8)}...] AI: "${aiResponse.substring(0, 50)}..."`);
        } else {
            console.log(`[${sessionId.substring(0, 8)}...] AI: <no response>`);
        }

        return c.json({
            response: aiResponse,
            sessionId,
            timestamp: new Date().toISOString(),
            tokensUsed: completion.usage?.total_tokens || 0,
        });
    } catch (error: unknown) {
        console.error('OpenRouter Error:', error);

        const errorStatus =
            typeof error === 'object' && error !== null && 'status' in error
                ? (error as { status?: number }).status
                : undefined;
        const errorCode =
            typeof error === 'object' && error !== null && 'code' in error
                ? (error as { code?: string }).code
                : undefined;
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        if (errorCode === 'insufficient_quota' || errorStatus === 402) {
            return c.json({
                error: 'Service temporarily unavailable. Please try again later.'
            }, 503);
        }

        return c.json({
            error: 'Failed to get response',
            details: errorMessage
        }, 500);
    }
});

app.post('/api/chatbot/reset-session', async (c) => {
    const body = await c.req.json();
    const { sessionId } = body;

    if (sessionId && sessions.has(sessionId)) {
        sessions.delete(sessionId);
        return c.json({ message: 'Session reset successfully' });
    }

    return c.json({ error: 'Session not found' }, 404);
});

// 404 handler
app.notFound((c) => {
    return c.json({ error: 'Not found' }, 404);
});

// Error handler
app.onError((err, c) => {
    console.error('Error:', err);
    return c.json({ error: 'Internal server error' }, 500);
});

// Export for Cloudflare Workers
export default app;
