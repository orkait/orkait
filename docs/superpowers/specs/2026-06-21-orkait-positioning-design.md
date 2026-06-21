# Orkait Positioning - Hero Purpose

Date: 2026-06-21

## Problem

The homepage read as "scammy". A grand, abstract identity ("Applied AI research, shipped as products", "AI lab") sat on top of one concrete shipped product (Rustbox) plus two early ones. Grand framing larger than the substance is what reads as inauthentic.

## The why (purpose)

Evidence over trust, for the places you can't afford to guess.

This is not invented - it is the product's own soul. Rustbox's core line is "verdicts come back with syscall evidence, not exit-code guesses." The flagship refuses to trust code and demands kernel-level proof. A scam asks you to trust it; Orkait's product is built on refusing to trust anything and demanding evidence. The homepage felt scammy because it did the opposite of the product: it asked to be believed instead of showing proof. The fix is to position the company the way the product behaves - show evidence, do not ask for faith.

## Positioning

- Spine (domain-led): builder for high-stakes execution - untrusted code, grading, agent runtimes - where being wrong is expensive.
- Ethos: measured, not hyped. Proof you can check, not promises.
- Voice: friendly-marketing, second person, concrete. No generic-AI vocabulary (enforced by `src/lib/data/data-integrity.test.ts`).

## Hero copy (shipped)

- Eyebrow: An AI lab that actually ships
- Headline: AI you don't have to take on faith.
- Subcopy: We build AI for the high-stakes moments - untrusted code, grading at scale, agents on the loose - and back every one with proof you can check, not promises. Rustbox is live, and it's just the start.
- Caption: Proof, not vibes - 147 adversarial tests, 8 isolation layers, 36 ms median, kernel-isolated.

## Open / to verify

- "zero escapes" claim: repo `products.ts` says "zero escapes across 22 adversarial tests"; rustbox.sh says 147 tests. Do not publish "zero escapes / 147" until the current count is confirmed. Caption currently omits it on purpose.
- Caption metrics sourced from rustbox.sh: 147 adversarial tests, 8 isolation layers, 36 ms median, 8 languages, kernel-isolated.
