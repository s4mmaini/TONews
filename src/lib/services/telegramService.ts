/**
 * Telegram WebApp Service
 * Manages integration with Telegram Mini App SDK
 */

// Extend Window interface to include Telegram WebApp
declare global {
	interface Window {
		Telegram?: {
			WebApp: TelegramWebApp;
		};
	}
}

export interface TelegramWebApp {
	ready: () => void;
	expand: () => void;
	close: () => void;
	MainButton: {
		show: () => void;
		hide: () => void;
		setText: (text: string) => void;
		onClick: (callback: () => void) => void;
		offClick: (callback: () => void) => void;
		showProgress: (leaveActive?: boolean) => void;
		hideProgress: () => void;
	};
	BackButton: {
		show: () => void;
		hide: () => void;
		onClick: (callback: () => void) => void;
		offClick: (callback: () => void) => void;
	};
	themeParams: {
		bg_color?: string;
		text_color?: string;
		hint_color?: string;
		link_color?: string;
		button_color?: string;
		button_text_color?: string;
	};
	colorScheme: 'light' | 'dark';
	initData: string;
	initDataUnsafe: {
		user?: {
			id: number;
			first_name: string;
			last_name?: string;
			username?: string;
			language_code?: string;
		};
	};
	version: string;
	platform: string;
	isExpanded: boolean;
	viewportHeight: number;
	viewportStableHeight: number;
	headerColor: string;
	backgroundColor: string;
	isClosingConfirmationEnabled: boolean;
	enableClosingConfirmation: () => void;
	disableClosingConfirmation: () => void;
	onEvent: (eventType: string, callback: () => void) => void;
	offEvent: (eventType: string, callback: () => void) => void;
	sendData: (data: string) => void;
	openLink: (url: string) => void;
	openTelegramLink: (url: string) => void;
	HapticFeedback: {
		impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
		notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
		selectionChanged: () => void;
	};
}

class TelegramService {
	private webApp: TelegramWebApp | null = null;
	private isInitialized = false;

	/**
	 * Initialize Telegram WebApp
	 * Call this once on app mount
	 */
	init(): boolean {
		// Check if running inside Telegram
		if (typeof window === 'undefined' || !window.Telegram?.WebApp) {
			console.warn('Telegram WebApp SDK not available');
			return false;
		}

		this.webApp = window.Telegram.WebApp;

		// Tell Telegram the app is ready
		this.webApp.ready();

		// Expand to full height
		this.webApp.expand();

		// Enable closing confirmation (optional)
		// this.webApp.enableClosingConfirmation();

		this.isInitialized = true;

		console.log('✅ Telegram WebApp initialized', {
			version: this.webApp.version,
			platform: this.webApp.platform,
			colorScheme: this.webApp.colorScheme,
			user: this.webApp.initDataUnsafe.user,
		});

		return true;
	}

	/**
	 * Check if running inside Telegram
	 */
	isTelegramEnvironment(): boolean {
		return typeof window !== 'undefined' && !!window.Telegram?.WebApp;
	}

	/**
	 * Get WebApp instance
	 */
	getWebApp(): TelegramWebApp | null {
		return this.webApp;
	}

	/**
	 * Get current user info from Telegram
	 */
	getUserInfo() {
		if (!this.webApp) return null;
		return this.webApp.initDataUnsafe.user;
	}

	/**
	 * Get color scheme (light/dark)
	 */
	getColorScheme(): 'light' | 'dark' | null {
		if (!this.webApp) return null;
		return this.webApp.colorScheme;
	}

	/**
	 * Get theme colors
	 */
	getThemeParams() {
		if (!this.webApp) return null;
		return this.webApp.themeParams;
	}

	/**
	 * Apply Telegram theme to app
	 */
	applyTheme() {
		if (!this.webApp) return;

		const theme = this.webApp.themeParams;
		const colorScheme = this.webApp.colorScheme;

		// Apply dark mode class
		if (colorScheme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		// Apply theme colors (optional - Tailwind già gestisce il tema)
		if (theme.bg_color) {
			document.documentElement.style.setProperty('--tg-bg-color', theme.bg_color);
		}
		if (theme.text_color) {
			document.documentElement.style.setProperty('--tg-text-color', theme.text_color);
		}
	}

	/**
	 * Show Main Button (bottom button in Telegram)
	 */
	showMainButton(text: string, onClick: () => void) {
		if (!this.webApp) return;

		this.webApp.MainButton.setText(text);
		this.webApp.MainButton.onClick(onClick);
		this.webApp.MainButton.show();
	}

	/**
	 * Hide Main Button
	 */
	hideMainButton() {
		if (!this.webApp) return;
		this.webApp.MainButton.hide();
	}

	/**
	 * Show Back Button (top-left in Telegram)
	 */
	showBackButton(onClick: () => void) {
		if (!this.webApp) return;

		this.webApp.BackButton.onClick(onClick);
		this.webApp.BackButton.show();
	}

	/**
	 * Hide Back Button
	 */
	hideBackButton() {
		if (!this.webApp) return;
		this.webApp.BackButton.hide();
	}

	/**
	 * Close the Mini App
	 */
	close() {
		if (!this.webApp) return;
		this.webApp.close();
	}

	/**
	 * Open external link
	 */
	openLink(url: string) {
		if (!this.webApp) {
			window.open(url, '_blank');
			return;
		}
		this.webApp.openLink(url);
	}

	/**
	 * Trigger haptic feedback (vibration)
	 */
	hapticFeedback(type: 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning' = 'light') {
		if (!this.webApp) return;

		if (type === 'success' || type === 'error' || type === 'warning') {
			this.webApp.HapticFeedback.notificationOccurred(type);
		} else {
			this.webApp.HapticFeedback.impactOccurred(type);
		}
	}
}

// Export singleton instance
export const telegramService = new TelegramService();
