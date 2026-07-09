// Shared contract between the Pages Function proxy (functions/api/run.ts) and
// the hero playground island. Kept pure so it is unit-testable without a
// network or a DOM.
//
// The upstream API (rustbox.sh) is anonymous but sends no
// access-control-allow-origin, so the browser cannot call it directly. We proxy
// same-origin. No credentials are involved - there is no secret to leak.

export const LANGUAGES = [
	"c",
	"cpp",
	"go",
	"java",
	"javascript",
	"python",
	"rust",
	"typescript",
] as const;

export type Language = (typeof LANGUAGES)[number];

/** Guard for anything crossing the network boundary. */
export function isLanguage(value: string): value is Language {
	return (LANGUAGES as readonly string[]).includes(value);
}

/** Abuse guard: the demo runs a snippet, not a codebase. */
export const MAX_CODE_LENGTH = 2000;

/** Longest we will wait for a verdict before telling the user plainly. */
export const RUN_TIMEOUT_MS = 12_000;

const MAX_OUTPUT = 2048;

export interface RustboxRaw {
	status?: string;
	language?: string;
	result?: {
		verdict?: string;
		cause?: string | null;
		exit_code?: number | null;
		signal?: string | number | null;
		error_message?: string | null;
	};
	output?: { stdout?: string; stderr?: string; integrity?: string };
	metrics?: { cpu_time_secs?: number; wall_time_secs?: number };
	evidence?: {
		isolation?: {
			controls_applied?: string[];
			controls_missing?: string[];
			mode?: string;
		};
	};
}

export interface RunResult {
	verdict: string;
	cause: string | null;
	exitCode: number | null;
	signal: string | number | null;
	stdout: string;
	stderr: string;
	truncated: boolean;
	cpuMs: number | null;
	wallMs: number | null;
	controlsApplied: number;
	isolationMode: string | null;
}

function clip(s: string): { text: string; truncated: boolean } {
	if (s.length <= MAX_OUTPUT) return { text: s, truncated: false };
	return { text: s.slice(0, MAX_OUTPUT), truncated: true };
}

const toMs = (secs: number | undefined): number | null =>
	typeof secs === "number" ? Math.round(secs * 1000 * 10) / 10 : null;

/**
 * Map the upstream payload onto exactly what the UI renders. Missing fields are
 * reported as unknown rather than guessed - this page's whole argument is that
 * the numbers are real.
 */
export function normalizeResult(raw: RustboxRaw): RunResult {
	const out = clip(raw.output?.stdout ?? "");
	const err = clip(raw.output?.stderr ?? "");
	const iso = raw.evidence?.isolation;

	return {
		verdict: raw.result?.verdict ?? "UNKNOWN",
		cause: raw.result?.cause ?? null,
		exitCode: typeof raw.result?.exit_code === "number" ? raw.result.exit_code : null,
		signal: raw.result?.signal ?? null,
		stdout: out.text,
		stderr: err.text,
		truncated: out.truncated || err.truncated,
		cpuMs: toMs(raw.metrics?.cpu_time_secs),
		wallMs: toMs(raw.metrics?.wall_time_secs),
		controlsApplied: iso?.controls_applied?.length ?? 0,
		isolationMode: iso?.mode ?? null,
	};
}
