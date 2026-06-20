interface Props {
	id: string;
	children: React.ReactNode;
}

export function FieldError({ id, children }: Props) {
	return (
		<p id={id} role="alert" className="flex items-center gap-1.5 text-destructive text-xs">
			<svg
				width="13"
				height="13"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2.4"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
				className="shrink-0"
			>
				<circle cx="12" cy="12" r="9" />
				<path d="M12 8v4M12 16h.01" />
			</svg>
			<span>{children}</span>
		</p>
	);
}

export default FieldError;
