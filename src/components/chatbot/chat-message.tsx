"use client";

import { cn } from "@/lib/utils";

interface ChatMessageProps {
	message: string;
	isBot: boolean;
}

export function ChatMessage({ message, isBot }: ChatMessageProps) {
	return (
		<div className={cn("flex w-full", isBot ? "justify-start" : "justify-end")}>
			<div
				className={cn(
					"max-w-[80%] rounded-lg px-4 py-2.5 text-sm",
					isBot ? "bg-muted text-foreground" : "bg-primary text-primary-foreground",
				)}
			>
				{message}
			</div>
		</div>
	);
}
