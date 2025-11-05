// Client-side only routing for Telegram Mini App
export const ssr = false;
export const prerender = false;
export const csr = true;

// Tell SvelteKit not to try loading data from server
export const load = async () => {
	return {};
};
