"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
	onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
	return (
		<div className="flex items-center justify-between rounded-t-xl bg-primary px-4 py-3">
			<div>
				<h3 className="text-sm font-bold tracking-wide text-primary-foreground">ORKAIT</h3>
				<p className="text-xs text-primary-foreground/70">AI Bot</p>
			</div>
			<Button
				variant="ghost"
				size="icon"
				className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/10"
				onClick={onClose}
				aria-label="Close chat"
			>
				<X className="h-4 w-4" />
			</Button>
		</div>
	);
}
