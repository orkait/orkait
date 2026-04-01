"use client";

import { useEffect, useRef, useState } from "react";

export type ChatMessage = {
	id: string;
	text: string;
	sender: "bot" | "user";
};

const INITIAL_MESSAGE: ChatMessage = {
	id: "welcome",
	text: "Ask about Orkait's current public projects, infrastructure, or upcoming product lines.",
	sender: "bot",
};

function createSessionId() {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
		return crypto.randomUUID();
	}

	return `session-${Date.now()}`;
}

function getBackendUrl() {
	const configured = process.env.NEXT_PUBLIC_CHATBOT_URL?.trim();

	if (configured) {
		return configured.replace(/\/$/, "");
	}

	if (typeof window !== "undefined" && window.location.hostname === "localhost") {
		return "http://127.0.0.1:8787";
	}

	return "";
}

export function useChatbot() {
	const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const scrollRef = useRef<HTMLDivElement>(null);
	const sessionIdRef = useRef(createSessionId());

	async function sendMessage(rawMessage: string) {
		const message = rawMessage.trim();

		if (!message || isLoading) {
			return;
		}

		const backendUrl = getBackendUrl();
		if (!backendUrl) {
			setError("The knowledge service is unavailable right now.");
			return;
		}

		const userMessage: ChatMessage = {
			id: `user-${Date.now()}`,
			text: message,
			sender: "user",
		};

		setMessages((current) => [...current, userMessage]);
		setInput("");
		setError(null);
		setIsLoading(true);

		try {
			const response = await fetch(`${backendUrl}/api/chatbot/chat`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message,
					sessionId: sessionIdRef.current,
				}),
			});

			if (!response.ok) {
				throw new Error("Chat request failed");
			}

			const payload = await response.json() as { response?: string };
			const botText =
				payload.response?.trim() || "The knowledge service is unavailable right now.";

			setMessages((current) => [
				...current,
				{
					id: `bot-${Date.now()}`,
					text: botText,
					sender: "bot",
				},
			]);
		} catch {
			setError("The knowledge service is unavailable right now.");
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		const element = scrollRef.current;
		if (!element) {
			return;
		}

		const timer = window.setTimeout(() => {
			element.scrollTop = element.scrollHeight;
		}, 0);

		return () => window.clearTimeout(timer);
	}, [messages, isLoading, error]);

	return {
		error,
		input,
		isLoading,
		messages,
		scrollRef,
		sendMessage,
		setInput,
	};
}
