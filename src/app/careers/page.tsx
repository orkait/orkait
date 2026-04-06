import type { Metadata } from "next";
import { Suspense } from "react";
import { CareersPage } from "@/components/careers/careers-page";
import { createPageMetadata } from "@/config/metadata";

export const metadata: Metadata = createPageMetadata(
    "Careers",
    "Open roles at Orkait. Engineering-first team. Real problems, no hype."
);

export default function CareersPageRoute() {
    return (
        <Suspense>
            <CareersPage />
        </Suspense>
    );
}
