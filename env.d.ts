/// <reference types="vite/client" />
/// <reference types="react-router" />
/// <reference types="@shopify/oxygen-workers-types" />
/// <reference types="@shopify/hydrogen/react-router-types" />

// Enhance TypeScript's built-in typings.
import '@total-typescript/ts-reset';

declare global {
	/**
	 * Environment variables available in the Oxygen worker runtime.
	 *
	 * Shopify CLI uses this interface to know which variables to inject into
	 * MiniOxygen during `shopify hydrogen dev`.
	 */
	interface Env {
		SESSION_SECRET: string;

		PUBLIC_STORE_DOMAIN: string;
		PUBLIC_CHECKOUT_DOMAIN?: string;
		PUBLIC_STOREFRONT_API_TOKEN: string;
		PRIVATE_STOREFRONT_API_TOKEN?: string;
		PUBLIC_STOREFRONT_ID: string;

		PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID?: string;
		PUBLIC_CUSTOMER_ACCOUNT_API_URL?: string;
		SHOP_ID?: string;

		PUBLIC_JUDGEME_SHOP_DOMAIN?: string;
		PUBLIC_JUDGEME_PUBLIC_TOKEN?: string;

		ALLOW_MOCK_STORE?: string;
	}
}

export {};
