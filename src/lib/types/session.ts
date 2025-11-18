/**
 * Session type re-export from global namespace
 * This allows importing Session type in regular TypeScript files
 */

export type Session = {
	token: string;
	id?: string;
	loggedIn?: boolean;
	subscription: boolean;
	expiresAt: Date;
	theme?: string;
	mobileTheme?: string;
	customCss?: string;
	customCssEnabled?: boolean;
	customCssAvailable?: boolean;
	language?: string;
	accountType: string;
};
