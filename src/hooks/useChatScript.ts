"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface ChatMessage {
    id: string;
    text: string;
    sender: "bot" | "user";
}

const MOCK_SCRIPT: Omit<ChatMessage, "id">[] = [
    { sender: "bot", text: "Hi there! How can I help?" },
    { sender: "user", text: "🤔 What is Orkait?" },
    { sender: "bot", text: "Orkait specializes in high-performance scalable solutions and rapid iteration." },
    { sender: "bot", text: "We empower businesses to thrive in the digital world through custom SaaS and enterprise deployment." },
];

export function useChatScript(isOpen: boolean) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const hasPlayedRef = useRef(false);

    const playScript = useCallback(async () => {
        for (let i = 0; i < MOCK_SCRIPT.length; i++) {
            const step = MOCK_SCRIPT[i];

            if (step.sender === "bot") {
                setIsTyping(true);
                await new Promise<void>((r) => setTimeout(r, 600));
                setIsTyping(false);
            } else {
                await new Promise<void>((r) => setTimeout(r, 400));
            }

            setMessages((prev) => [...prev, { ...step, id: `msg-${i}` }]);
            await new Promise<void>((r) => setTimeout(r, 300));
        }
    }, []);

    // Play mock script once per open session
    useEffect(() => {
        if (!isOpen || hasPlayedRef.current) return;
        hasPlayedRef.current = true;
        playScript();
    }, [isOpen, playScript]);

    // Auto-scroll to bottom when messages or typing state changes
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    return { messages, isTyping, scrollRef };
}
