import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Static adapter for Telegram Mini App (no server needed)
		adapter: adapter({
			fallback: 'index.html', // SPA mode for client-side routing
			strict: false
		}),
	},
};

export default config;
