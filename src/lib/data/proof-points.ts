export interface ProofPoint {
	label: string;
	claim: string;
	detail: string;
}

export const SYSTEMS_PROOF_INTRO = {
	eyebrow: "Built at the systems level",
	title: "We build down to the kernel.",
	lead: 'The "research" in applied AI research is real engineering - kernels, sandboxes, and memory we wrote ourselves.',
} as const;

export const PROOF_POINTS: ProofPoint[] = [
	{
		label: "Research · compression",
		claim: "Models toward 1 bit per weight",
		detail:
			"Orka packs language-model weights with learned codebooks and a hand-written GGML kernel. Byte-exact, measured - not shipped yet.",
	},
	{
		label: "Secure execution",
		claim: "Sandboxed at the kernel",
		detail:
			"Rustbox isolates untrusted code with seccomp rules and Linux namespaces, not a Docker wrapper. Zero escapes across 148 adversarial tests.",
	},
	{
		label: "Agent memory",
		claim: "Recall by association",
		detail:
			"GraphStore spreads activation across sparse matrices, with a DSL that reads like sentences. No Cypher, no SPARQL.",
	},
	{
		label: "Discipline",
		claim: "Measured, not hyped",
		detail:
			"Every number here comes from a measurement or a formula. We do not claim solved problems.",
	},
];
