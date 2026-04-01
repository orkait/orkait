# Knowledge Chatbot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a manually curated `/knowledge` source, move the existing Worker app into `/chatbot`, ground the bot in the KB with token-efficient section selection, and replace the fake site chat UI with a real backend integration.

**Architecture:** The Next.js app will own the public `/knowledge` route and markdown source. A Cloudflare Worker under `/chatbot` will read the markdown KB, parse it into sections, select only relevant sections for each request, and query OpenRouter with a short prompt plus a short conversation window. The site chat widget will call that Worker rather than replaying a mock script.

**Tech Stack:** Next.js 16, React 19, TypeScript, Cloudflare Workers, Hono, OpenRouter, Bun/node:test

---

### Task 1: Curated Knowledge Source

**Files:**
- Create: `knowledge/index.md`
- Create: `src/app/knowledge/page.tsx`
- Modify: `src/config/routes.ts`
- Test: `src/data/data-integrity.test.ts`

- [ ] **Step 1: Write the failing test**

Add assertions that:
- `knowledge/index.md` exists
- required KB headings exist

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test src/data/data-integrity.test.ts`
Expected: FAIL because `knowledge/index.md` does not exist yet

- [ ] **Step 3: Write minimal implementation**

Create the curated markdown KB manually with required sections and add a `/knowledge` page that renders it.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test src/data/data-integrity.test.ts`
Expected: PASS for KB structure assertions

### Task 2: Worker Grounding And Token Selection

**Files:**
- Create: `chatbot/*` by moving the Worker project into the repo
- Modify: `chatbot/src/index.ts`
- Create: `chatbot/src/knowledge.ts`
- Create: `chatbot/src/index.test.ts`

- [ ] **Step 1: Write the failing test**

Add Worker tests that verify:
- KB markdown is loaded
- only relevant KB sections are selected
- out-of-KB questions return a KB-boundary answer path

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test --prefix chatbot`
Expected: FAIL because the Worker still uses a hardcoded system blob

- [ ] **Step 3: Write minimal implementation**

Remove the static company prompt, load `knowledge/index.md`, parse headings into sections, add lightweight local section selection, and build the OpenRouter prompt from selected sections plus short conversation history.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test --prefix chatbot`
Expected: PASS

### Task 3: Site Chat Integration

**Files:**
- Modify: `src/components/layout/chat-widget.tsx`
- Replace: `src/hooks/useChatScript.ts`
- Create: `src/hooks/useChatbot.ts`
- Test: `src/app/actions/contact.test.ts` (keep passing) and targeted lint/tests for chat files

- [ ] **Step 1: Write the failing test**

Add a minimal regression check for the new hook or integration path, or if framework support is too thin, use lint/build verification as the guardrail and remove fake inert controls from the UI only after the backend contract is ready.

- [ ] **Step 2: Run verification to confirm current behavior is insufficient**

Run: `bunx eslint src/components/layout/chat-widget.tsx src/hooks/useChatScript.ts`
Expected: Existing code shows fake/mock behavior and is not the desired backend integration

- [ ] **Step 3: Write minimal implementation**

Replace mock chat playback with real request/response handling against the Worker endpoint, real loading/error states, and live starter prompts.

- [ ] **Step 4: Run verification**

Run: `bunx eslint src/components/layout/chat-widget.tsx src/hooks/useChatbot.ts`
Expected: PASS

### Task 4: Final Verification

**Files:**
- Verify all modified files

- [ ] **Step 1: Run knowledge tests**

Run: `bun test src/data/data-integrity.test.ts`
Expected: PASS

- [ ] **Step 2: Run contact action tests**

Run: `bun test src/app/actions/contact.test.ts`
Expected: PASS

- [ ] **Step 3: Run Worker tests**

Run: `npm test --prefix chatbot`
Expected: PASS

- [ ] **Step 4: Run targeted lint**

Run: `bunx eslint src/components/layout/chat-widget.tsx src/hooks/useChatbot.ts src/app/knowledge/page.tsx chatbot/src/index.ts chatbot/src/index.test.ts`
Expected: PASS
