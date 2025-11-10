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
              Il tuo digest quotidiano di notizie su Telegram
            </p>
          </div>
        </div>

        <div class="space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2
              class="mb-3 text-xl font-semibold text-gray-900 dark:text-white"
            >
              Cos'è TONews?
            </h2>
            <p class="mb-4">
              TONews è una Mini App Telegram che ti porta 12 notizie rilevanti ogni giorno, curate per i tuoi interessi: Crypto, Sport, Politica e molto altro. Un'interfaccia pulita, niente distrazioni, zero pubblicità invasiva.
            </p>
          </section>

          <section>
            <h2
              class="mb-3 text-xl font-semibold text-gray-900 dark:text-white"
            >
              I nostri principi
            </h2>
            <ul class="space-y-2">
              <li>
                • <strong>Chiarezza</strong>: solo le notizie che contano, senza rumore di fondo
              </li>
              <li>
                • <strong>Sintesi</strong>: 12 storie al giorno, mai troppo, mai troppo poco
              </li>
              <li>
                • <strong>Zero sovraccarico</strong>: niente scroll infinito, niente clickbait
              </li>
              <li>
                • <strong>Privacy</strong>: nessun tracker pubblicitario di terze parti
              </li>
              <li>
                • <strong>Trasparenza delle fonti</strong>: ogni notizia indica la sua origine
              </li>
            </ul>
          </section>

          <section>
            <h2
              class="mb-3 text-xl font-semibold text-gray-900 dark:text-white"
            >
              Come funziona
            </h2>
            <p class="mb-4 text-gray-700 dark:text-gray-300">
              Ogni giorno TONews seleziona e aggrega notizie da fonti pubbliche verificate. L'elenco viene aggiornato regolarmente per garantirti contenuti sempre freschi e rilevanti.
            </p>
            <p class="mb-4 text-gray-700 dark:text-gray-300">
              Puoi personalizzare le categorie che preferisci e leggere le notizie direttamente dall'app, oppure approfondire visitando le fonti originali.
            </p>
          </section>

          <section>
            <h2
              class="mb-3 text-xl font-semibold text-gray-900 dark:text-white"
            >
              Trasparenza
            </h2>
            <p class="mb-4 text-gray-700 dark:text-gray-300">
              Le notizie provengono da fonti pubbliche e API accessibili. TONews non è affiliato con i publisher originali. Tutti i contenuti rimandano alle fonti ufficiali e rispettiamo le licenze d'uso.
            </p>
            <p class="mb-4 text-gray-700 dark:text-gray-300">
              Non vendiamo i tuoi dati. Non tracciamo la tua navigazione al di fuori dell'app. Telegram gestisce l'autenticazione in modo sicuro.
            </p>
          </section>

          <!-- Disclaimer -->
          <section class="mt-6 rounded-lg bg-gray-100 dark:bg-gray-700 p-4">
            <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
              I sommari possono essere generati automaticamente. Verifica sempre le informazioni importanti consultando le fonti originali.
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
