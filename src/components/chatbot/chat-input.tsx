"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
	onSend: (message: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
	const [value, setValue] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!value.trim()) return;
		onSend(value.trim());
		setValue("");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex items-center gap-2 border-t border-border px-3 py-3"
		>
			<Input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Type your message here..."
				className="flex-1 border-border bg-background text-sm text-foreground placeholder:text-muted-foreground"
			/>
			<button
				type="submit"
				className="rounded-md bg-primary px-4 py-2 text-xs font-bold tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
			>
				SEND
			</button>
		</form>
	);
}
