import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: process.env.VITEST
		? {
				conditions: ['browser'],
			}
		: undefined,
	build: {
		assetsInlineLimit: 0, // Prevent inlining assets
		cssCodeSplit: true, // Enable CSS code splitting
		minify: 'esbuild', // Use esbuild for faster minification
	},
});
