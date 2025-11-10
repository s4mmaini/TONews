<script lang="ts">
import { useOverlayScrollbars } from 'overlayscrollbars-svelte';
import { browser } from '$app/environment';
import { s } from '$lib/client/localization.svelte';
import 'overlayscrollbars/overlayscrollbars.css';

// Props
interface Props {
	visible?: boolean;
	onClose?: () => void;
}

let { visible = false, onClose }: Props = $props();

// OverlayScrollbars setup
let scrollableElement: HTMLElement | undefined = $state(undefined);
let [initialize, instance] = useOverlayScrollbars({
	defer: true,
});

function handleClose() {
	// Scroll to top of the page
	if (browser) {
		window.scrollTo({ top: 0, behavior: 'instant' });
	}
	if (onClose) onClose();
}

function handleKeydown(e: KeyboardEvent) {
	if (e.key === 'Escape' && visible) {
		handleClose();
	}
}

// Close on escape key
$effect(() => {
	if (browser) {
		if (visible) {
			document.addEventListener('keydown', handleKeydown);
		} else {
			document.removeEventListener('keydown', handleKeydown);
		}

		// Cleanup
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	}
});

// Initialize OverlayScrollbars
$effect(() => {
	if (scrollableElement) {
		initialize(scrollableElement);
	}
});
</script>

{#if visible}
  <div
    bind:this={scrollableElement}
    class="fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-gray-900"
    data-overlayscrollbars-initialize
  >
    <div class="flex min-h-full items-center justify-center p-4 sm:p-8">
      <div class="w-full max-w-3xl rounded-lg bg-white p-8 dark:bg-gray-800">
        <div class="mb-8 flex items-start justify-between">
          <div class="w-full">
            <h1 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              TONews
            </h1>
            <p class="text-gray-600 dark:text-gray-300">
              Your daily news digest on Telegram
            </p>
          </div>
        </div>

        <div class="space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2
              class="mb-3 text-xl font-semibold text-gray-900 dark:text-white"
            >
              What is TONews?
            </h2>
            <p class="mb-4">
              TONews is a Telegram Mini App that brings you 12 relevant news stories every day, curated for your interests: Crypto, Sports, Politics, and more. A clean interface, no distractions, zero intrusive advertising.
            </p>
          </section>

          <section>
            <h2
              class="mb-3 text-xl font-semibold text-gray-900 dark:text-white"
            >
              Our Principles
            </h2>
            <ul class="space-y-2">
              <li>
                • <strong>Clarity</strong>: only the news that matters, without background noise
              </li>
              <li>
                • <strong>Synthesis</strong>: 12 stories per day, never too much, never too little
              </li>
              <li>
                • <strong>Zero overload</strong>: no infinite scroll, no clickbait
              </li>
              <li>
                • <strong>Privacy</strong>: no third-party advertising trackers
              </li>
              <li>
                • <strong>Source transparency</strong>: every story indicates its origin
              </li>
            </ul>
          </section>

          <section>
            <h2
              class="mb-3 text-xl font-semibold text-gray-900 dark:text-white"
            >
              How it Works
            </h2>
            <p class="mb-4 text-gray-700 dark:text-gray-300">
              Every day, TONews selects and aggregates news from verified public sources. The list is updated regularly to ensure you get fresh and relevant content.
            </p>
            <p class="mb-4 text-gray-700 dark:text-gray-300">
              You can customize your preferred categories and read the news directly in the app, or explore further by visiting the original sources.
            </p>
          </section>

          <section>
            <h2
              class="mb-3 text-xl font-semibold text-gray-900 dark:text-white"
            >
              Transparency
            </h2>
            <p class="mb-4 text-gray-700 dark:text-gray-300">
              News comes from public sources and accessible APIs. TONews is not affiliated with the original publishers. All content links back to official sources, and we respect usage licenses.
            </p>
            <p class="mb-4 text-gray-700 dark:text-gray-300">
              We don't sell your data. We don't track your browsing outside the app. Telegram handles authentication securely.
            </p>
          </section>

          <!-- Disclaimer -->
          <section class="mt-6 rounded-lg bg-gray-100 dark:bg-gray-700 p-4">
            <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
              Summaries may be automatically generated. Always verify important information by consulting the original sources.
            </p>
          </section>

          <div class="mt-8 flex justify-center">
            <button
              onclick={handleClose}
              class="focus:ring-opacity-75 rounded-lg bg-black px-6 py-3 font-semibold text-white transition-colors duration-200 ease-in-out hover:bg-gray-800 focus:ring-2 focus:ring-gray-400 focus:outline-none"
            >
              {@html s("about.understand.button") || "Got it!"}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
