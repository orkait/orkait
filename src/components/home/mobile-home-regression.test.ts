import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

function readSource(relativePath: string) {
	return readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

describe("mobile homepage regression guards", () => {
	it("keeps hero spacing compact instead of relying on oversized fixed offsets", () => {
		const source = readSource("src/components/home/Hero.tsx");

		assert.doesNotMatch(source, /gap-\[68px\]/);
		assert.doesNotMatch(source, /mt-\[168px\]/);
	});

	it("keeps the mobile showcase compact instead of scaling down an oversized canvas", () => {
		const source = readSource("src/components/home/Flash.tsx");

		assert.doesNotMatch(source, /h-\[380px\]/);
		assert.doesNotMatch(source, /scale-\[0\.65\]/);
	});

	it("left-aligns the secondary studio paragraph instead of offsetting it into whitespace", () => {
		const source = readSource("src/components/home/StudioText.tsx");

		assert.doesNotMatch(source, /pl-\[50px\]/);
	});

	it("keeps decorative simulation panels compact on smaller screens", () => {
		const studioSource = readSource("src/components/home/StudioText.tsx");
		const servicesSource = readSource("src/components/home/ServicesText.tsx");

		assert.match(studioSource, /max-h-\[220px\]/);
		assert.doesNotMatch(studioSource, /aspect-\[340\/300\]/);

		assert.match(servicesSource, /tablet:w-\[320px\]/);
		assert.match(servicesSource, /tablet:aspect-\[5\/4\]/);
	});

	it("keeps inactive services visible enough on mobile", () => {
		const source = readSource("src/components/home/ServicesText.tsx");

		assert.doesNotMatch(source, /text-black\/5/);
	});

	it("does not cap the mobile advance content to 70 percent width", () => {
		const source = readSource("src/components/home/Advance.tsx");

		assert.doesNotMatch(source, /w-\[70%\]/);
	});

	it("uses readable mobile body sizes in the process grid and testimonial cards", () => {
		const processSource = readSource("src/components/home/Process.tsx");
		const feedbackCardSource = readSource("src/components/home/FeedbackCard.tsx");

		assert.doesNotMatch(processSource, /text-\[10px\]/);
		assert.doesNotMatch(feedbackCardSource, /text-\[10px\]/);
	});

	it("disables decorative autoplay on mobile and reduced-motion paths", () => {
		const flashSource = readSource("src/components/home/Flash.tsx");
		const feedbackSource = readSource("src/components/home/Feedback.tsx");

		assert.match(flashSource, /useIsMobile/);
		assert.match(flashSource, /prefersReducedMotion/);
		assert.match(flashSource, /autoPlay=\{!isMobile && !prefersReducedMotion\}/);

		assert.match(feedbackSource, /useIsMobile/);
		assert.match(feedbackSource, /prefersReducedMotion/);
		assert.match(feedbackSource, /const shouldAutoplay = !isMobile && !prefersReducedMotion/);
		assert.match(feedbackSource, /stopOnInteraction:\s*true/);
	});
});
