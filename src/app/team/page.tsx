import type { Metadata } from "next";
import { createPageMetadata } from "@/config/metadata";
import Team from "@/components/Team";

export const metadata: Metadata = createPageMetadata(
	"Our Team",
	"Meet the Orkait team."
);

export default function TeamPage() {
	return (
		<main className="min-h-screen pt-24">
			<Team />
		</main>
	);
}
