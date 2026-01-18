import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function devDelay(ms: number = 1000) {
	if (process.env.NODE_ENV === "development") {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}

export function sameOrder<T extends { id: string }>(a: T[], b: T[]) {
	if (a.length !== b.length) return false;
	return a.every((item, i) => item.id === b[i]?.id);
}

export function replaceDomain(
	originalUrl: string | null,
	newDomain = "pub-fedebec83d6a4a24a4b4a3f5e177ddfd.r2.dev",
): string | null {
	if (!originalUrl) return null;

	try {
		const url = new URL(originalUrl);

		// 1. Clean the newDomain to ensure no protocol (https://) is attached
		url.host = newDomain.replace(/^https?:\/\//, "");

		// 2. Inject "/fit" at the start of the path if it's not already there
		if (!url.pathname.startsWith("/fit/")) {
			url.pathname = `/fit${url.pathname}`;
		}

		return url.toString();
	} catch (error) {
		// Instead of throwing, you might want to return the originalUrl or null
		// depending on how strictly you want your UI to fail.
		throw new Error(`Invalid URL provided: ${originalUrl}`);
	}
}

// Test case:
// Input:  "https://cdn.sfivaz.com/exercises/0001.gif"
// Output: "https://pub-fedebec83d6a4a24a4b4a3f5e177ddfd.r2.dev/fit/exercises/0001.gif"
