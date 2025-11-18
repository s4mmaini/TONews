<script lang="ts">
import { s } from '$lib/client/localization.svelte';
import { themeSettings } from '$lib/data/settings.svelte.js';

// Props
interface Props {
	onShowAbout?: () => void;
}

let { onShowAbout }: Props = $props();

// Handle about click
function handleAboutClick() {
	// Push /about to the URL
	window.history.pushState({}, '', '/about');
	if (onShowAbout) onShowAbout();
}
</script>

<footer class="mt-8 pt-4 pb-8 md:pb-4">
  <div
    class="container mx-auto flex max-w-[732px] items-center justify-center px-4"
  >
    <button
      onclick={handleAboutClick}
      class="flex items-center space-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
      title={s("footer.about") || "About TONews"}
    >
      <img
        src="/tonews-logo.png"
        alt={s("app.logo.iconAlt") || "TONews"}
        class="h-5 w-5"
      />
      <span class="text-xs sm:text-sm">
        <span class="sm:hidden">About</span>
        <span class="hidden sm:inline">About TONews</span>
      </span>
    </button>
  </div>
</footer>
