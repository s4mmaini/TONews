<script lang="ts">
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-svelte';
import { s } from '$lib/client/localization.svelte';
import { settings, themeSettings } from '$lib/data/settings.svelte.js';

function handleChange(value: 'system' | 'light' | 'dark') {
	themeSettings.theme = value;
	settings.theme.save();
}
</script>

<div class="space-y-3">
  <label class="block text-sm font-medium" style="color: var(--tg-text-primary);">
    {s("settings.theme.label") || "Theme"}
  </label>
  <div class="grid grid-cols-3 gap-3">
    <button
      onclick={() => handleChange('light')}
      class="flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors"
      style="
        border-color: {themeSettings.theme === 'light' ? 'var(--tg-accent)' : 'var(--tg-border)'};
        background-color: {themeSettings.theme === 'light' ? 'var(--tg-accent)' : 'transparent'};
        background-color: {themeSettings.theme === 'light' ? 'color-mix(in srgb, var(--tg-accent) 10%, transparent)' : 'transparent'};
        color: {themeSettings.theme === 'light' ? 'var(--tg-accent)' : 'var(--tg-text-secondary)'};
      "
    >
      <IconSun size={20} stroke={2} />
      <span class="text-sm font-medium">{s('settings.theme.light') || 'Light'}</span>
    </button>

    <button
      onclick={() => handleChange('dark')}
      class="flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors"
      style="
        border-color: {themeSettings.theme === 'dark' ? 'var(--tg-accent)' : 'var(--tg-border)'};
        background-color: {themeSettings.theme === 'dark' ? 'color-mix(in srgb, var(--tg-accent) 10%, transparent)' : 'transparent'};
        color: {themeSettings.theme === 'dark' ? 'var(--tg-accent)' : 'var(--tg-text-secondary)'};
      "
    >
      <IconMoon size={20} stroke={2} />
      <span class="text-sm font-medium">{s('settings.theme.dark') || 'Dark'}</span>
    </button>

    <button
      onclick={() => handleChange('system')}
      class="flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors"
      style="
        border-color: {themeSettings.theme === 'system' ? 'var(--tg-accent)' : 'var(--tg-border)'};
        background-color: {themeSettings.theme === 'system' ? 'color-mix(in srgb, var(--tg-accent) 10%, transparent)' : 'transparent'};
        color: {themeSettings.theme === 'system' ? 'var(--tg-accent)' : 'var(--tg-text-secondary)'};
      "
    >
      <IconDeviceDesktop size={20} stroke={2} />
      <span class="text-sm font-medium">{s('settings.theme.system') || 'Auto'}</span>
    </button>
  </div>
</div>
