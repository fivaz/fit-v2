import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge and normalize one or more class name inputs into a single Tailwind-compatible class string.
 *
 * @param inputs - Class name values (strings, arrays, objects, or other clsx-compatible values) to merge
 * @returns The merged, deduplicated class string suitable for Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Introduces an artificial delay when running in the development environment.
 *
 * @param ms - Delay duration in milliseconds (default: 0)
 * @returns A Promise that resolves after `ms` milliseconds when `NODE_ENV` is `"development"`, otherwise `undefined`
 */
export async function devDelay(ms: number = 0) {
	if (process.env.NODE_ENV === "development") {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}

/**
 * Determines whether two arrays contain the same sequence of item ids in the same order.
 *
 * @param a - First array of items with `id` properties.
 * @param b - Second array of items with `id` properties.
 * @returns `true` if both arrays have the same length and each corresponding item's `id` is equal, `false` otherwise.
 */
export function sameOrder<T extends { id: string }>(a: T[], b: T[]) {
	if (a.length !== b.length) return false;
	return a.every((item, i) => item.id === b[i]?.id);
}

/**
 * Optionally replace a specific CDN domain in `url` with a fallback domain when the public domain is down.
 *
 * If `process.env.NEXT_PUBLIC_IS_PUBLIC_DOMAIN_DOWN` is truthy and `url` begins with
 * `https://cdn.sfivaz.com`, that prefix is replaced with a fallback domain. If the env flag is falsy,
 * the function returns the original `url` (or an empty string when `url` is null/undefined). If `url`
 * is null or undefined, an empty string is returned.
 *
 * @param url - The URL to inspect and potentially transform
 * @returns The transformed URL if replacement occurred, the original `url` when no replacement was needed, or an empty string when `url` is null/undefined
 */
export function replaceDomain(url: string | null | undefined): string {
	if(!process.env.NEXT_PUBLIC_IS_PUBLIC_DOMAIN_DOWN) return url || "";

	if (!url) return "";

	const oldDomain = "https://cdn.sfivaz.com";
	const newDomain = "https://pub-fedebec83d6a4a24a4b4a3f5e177ddfd.r2.dev";

	if (url.startsWith(oldDomain)) {
		return url.replace(oldDomain, newDomain);
	}

	return url;
}