import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

function readSource(relativePath: string) {
	return readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

const HERO = "src/components/sections/home/Hero.astro";
const STUDIO = "src/components/sections/home/StudioText.astro";
const SERVICES = "src/components/sections/home/ServicesText.astro";
const ADVANCE = "src/components/sections/home/Advance.astro";
const PROCESS = "src/components/sections/home/Process.astro";
const INDEX = "src/pages/index.astro";
const FLASH = "src/components/react/Flash.tsx";
const FEEDBACK = "src/components/react/Feedback.tsx";
const FEEDBACK_CARD = "src/components/react/FeedbackCard.tsx";

describe("mobile homepage regression guards", () => {
	it("keeps hero spacing compact instead of relying on oversized fixed offsets", () => {
		const source = readSource(HERO);

		expect(source).not.toMatch(/gap-\[68px\]/);
		expect(source).not.toMatch(/mt-\[168px\]/);
	});

	it("left-aligns the secondary studio paragraph instead of offsetting it into whitespace", () => {
		const source = readSource(STUDIO);

		expect(source).not.toMatch(/pl-\[50px\]/);
	});

	it("keeps decorative simulation panels compact on smaller screens", () => {
		const studioSource = readSource(STUDIO);
		const servicesSource = readSource(SERVICES);

		// Mobile ASCII panel stays bounded instead of growing into an oversized canvas.
		expect(studioSource).toMatch(/max-h-\[220px\]/);

		// Game of Life decorative panel stays compact on tablet.
		expect(servicesSource).toMatch(/tablet:w-\[320px\]/);
		expect(servicesSource).toMatch(/tablet:aspect-\[5\/4\]/);
	});

	it("keeps inactive services visible enough on mobile", () => {
		const source = readSource(SERVICES);

		// Inactive labels must not fade to near-invisible (legacy text-black/5 regression).
		expect(source).not.toMatch(/text-black\/5\b/);
		expect(source).not.toMatch(/text-muted-foreground\/(?:[0-9]|1[0-9])\b/);
	});

	it("does not cap the mobile advance content to 70 percent width", () => {
		const source = readSource(ADVANCE);

		expect(source).not.toMatch(/\bw-\[70%\]/);
	});

	it("uses readable mobile body sizes in the process grid and testimonial cards", () => {
		const processSource = readSource(PROCESS);
		const feedbackCardSource = readSource(FEEDBACK_CARD);

		expect(processSource).not.toMatch(/text-\[10px\]/);
		expect(feedbackCardSource).not.toMatch(/text-\[10px\]/);
	});

	it("disables decorative autoplay on mobile and reduced-motion paths", () => {
		const flashSource = readSource(FLASH);
		const feedbackSource = readSource(FEEDBACK);

		expect(flashSource).toMatch(/useIsMobile/);
		expect(flashSource).toMatch(/prefersReducedMotion/);
		expect(flashSource).toMatch(/autoPlay=\{!isMobile && !prefersReducedMotion\}/);

		expect(feedbackSource).toMatch(/useIsMobile/);
		expect(feedbackSource).toMatch(/prefersReducedMotion/);
		expect(feedbackSource).toMatch(/const shouldAutoplay = !isMobile && !prefersReducedMotion/);
		expect(feedbackSource).toMatch(/stopOnInteraction:\s*true/);
	});

	it("renders decorative islands only when visible so mobile is not forced to hydrate them", () => {
		const indexSource = readSource(INDEX);

		// Heavy decorative islands stay deferred to client:visible on the home page.
		expect(indexSource).toMatch(/Flash client:visible/);
		expect(indexSource).toMatch(/Feedback client:visible/);
	});
});
