"use client";

interface QuickActionsProps {
	onSelect: (text: string) => void;
}

const actions = [
	{ label: "What is Orkait?", icon: "👋" },
	{ label: "Pricing", icon: "💰" },
	{ label: "FAQs", icon: "❓" },
];

export function QuickActions({ onSelect }: QuickActionsProps) {
	return (
		<div className="flex flex-wrap gap-2 px-4 py-2">
			{actions.map((action) => (
				<button
					key={action.label}
					onClick={() => onSelect(action.label)}
					className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
				>
					<span>{action.icon}</span>
					{action.label}
				</button>
			))}
		</div>
	);
}
