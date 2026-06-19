/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_SITE_URL: string;
	readonly PUBLIC_CHATBOT_URL: string;
	readonly PUBLIC_FORMS_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
