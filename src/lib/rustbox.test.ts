import { describe, expect, it } from "vitest";
import {
	LANGUAGES,
	MAX_CODE_LENGTH,
	isLanguage,
	normalizeResult,
	type RustboxRaw,
} from "./rustbox";

const raw: RustboxRaw = {
	status: "completed",
	language: "python",
	result: { verdict: "AC", cause: "normal_exit", exit_code: 0, signal: null },
	output: { stdout: "42\n", stderr: "", integrity: "complete" },
	metrics: { cpu_time_secs: 0.013701, wall_time_secs: 0.02 },
	evidence: {
		isolation: {
			controls_applied: ["pid_namespace", "mount_namespace", "network_namespace"],
			controls_missing: [],
			mode: "strict",
		},
	},
};

describe("rustbox language guard", () => {
	it("exposes exactly the eight languages the site claims", () => {
		expect(LANGUAGES).toHaveLength(8);
	});

	it("accepts a supported language and rejects anything else", () => {
		expect(isLanguage("python")).toBe(true);
		expect(isLanguage("rust")).toBe(true);
		expect(isLanguage("brainfuck")).toBe(false);
		expect(isLanguage("")).toBe(false);
	});

	it("caps submitted code length", () => {
		expect(MAX_CODE_LENGTH).toBeGreaterThan(0);
		expect(MAX_CODE_LENGTH).toBeLessThanOrEqual(4000);
	});
});

describe("normalizeResult", () => {
	it("maps a completed run to the shape the UI renders", () => {
		const n = normalizeResult(raw);
		expect(n.verdict).toBe("AC");
		expect(n.cause).toBe("normal_exit");
		expect(n.exitCode).toBe(0);
		expect(n.signal).toBeNull();
		expect(n.stdout).toBe("42\n");
		expect(n.stderr).toBe("");
		// seconds -> milliseconds, one decimal
		expect(n.cpuMs).toBeCloseTo(13.7, 1);
		expect(n.wallMs).toBeCloseTo(20.0, 1);
		expect(n.controlsApplied).toBe(3);
		expect(n.isolationMode).toBe("strict");
	});

	it("truncates runaway stdout instead of shipping it whole", () => {
		const n = normalizeResult({
			...raw,
			output: { ...raw.output!, stdout: "x".repeat(9000) },
		});
		expect(n.stdout.length).toBeLessThanOrEqual(2048);
		expect(n.truncated).toBe(true);
	});

	it("survives a partial payload without throwing", () => {
		const n = normalizeResult({ status: "completed" } as RustboxRaw);
		expect(n.verdict).toBe("UNKNOWN");
		expect(n.exitCode).toBeNull();
		expect(n.stdout).toBe("");
		expect(n.controlsApplied).toBe(0);
	});

	it("reports a non-zero exit faithfully rather than pretending success", () => {
		const n = normalizeResult({
			...raw,
			result: { verdict: "RE", cause: "runtime_error", exit_code: 1, signal: null },
			output: { stdout: "", stderr: "boom", integrity: "complete" },
		});
		expect(n.verdict).toBe("RE");
		expect(n.exitCode).toBe(1);
		expect(n.stderr).toBe("boom");
	});
});
