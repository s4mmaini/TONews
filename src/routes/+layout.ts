import locales from "$lib/locales";

// Client-side only routing for Telegram Mini App
export const ssr = false;
export const prerender = false;
export const csr = true;

// Load default locale on client-side
export const load = async () => {
	return {
		locale: "en",
		strings: locales.en,
	};
};
