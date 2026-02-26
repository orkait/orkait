"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatHeader } from "./chat-header";
import { ChatMessage } from "./chat-message";
import { QuickActions } from "./quick-actions";
import { ChatInput } from "./chat-input";

interface Message {
	id: number;
	text: string;
	isBot: boolean;
}

const INITIAL_MESSAGES: Message[] = [{ id: 1, text: "Hi there! How can I help?", isBot: true }];

export function ChatbotWidget() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages]);

	const addMessage = (text: string) => {
		const userMessage: Message = {
			id: Date.now(),
			text,
			isBot: false,
		};
		setMessages((prev) => [...prev, userMessage]);

		// Simulated bot reply
		setTimeout(() => {
			const botReply: Message = {
				id: Date.now() + 1,
				text: getBotReply(text),
				isBot: true,
			};
			setMessages((prev) => [...prev, botReply]);
		}, 800);
	};

	return (
		<>
			{/* Chat Window */}
			{isOpen && (
				<div className="fixed right-6 bottom-24 z-50 flex h-[460px] w-[350px] flex-col overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
					<ChatHeader onClose={() => setIsOpen(false)} />

					<ScrollArea className="flex-1 px-4 py-4" ref={scrollRef}>
						<div className="flex flex-col gap-3">
							{messages.map((msg) => (
								<ChatMessage key={msg.id} message={msg.text} isBot={msg.isBot} />
							))}
						</div>
					</ScrollArea>

					<QuickActions onSelect={addMessage} />
					<ChatInput onSend={addMessage} />
				</div>
			)}

			{/* Floating Toggle Button */}
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
				aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
			>
				<MessageSquare className="h-6 w-6" />
			</button>
		</>
	);
}

function getBotReply(userText: string): string {
	const lower = userText.toLowerCase();
	if (lower.includes("orkait") || lower.includes("what is")) {
		return "ORKAIT is a cutting-edge AI-powered platform designed to streamline your workflows and boost productivity.";
	}
	if (lower.includes("pricing") || lower.includes("price") || lower.includes("cost")) {
		return "We offer flexible plans starting from $29/mo. Visit our pricing page for full details!";
	}
	if (lower.includes("faq") || lower.includes("help") || lower.includes("question")) {
		return "Check out our FAQ page for common questions, or feel free to ask me anything here!";
	}
	return "Thanks for your message! Our team will get back to you shortly. Is there anything else I can help with?";
}
