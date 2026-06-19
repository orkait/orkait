import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: process.env.PUBLIC_SITE_URL ?? "https://orkait.com",
	integrations: [react(), sitemap()],
	build: { inlineStylesheets: "always" },
	vite: { resolve: { dedupe: ["react", "react-dom"] } },
});
