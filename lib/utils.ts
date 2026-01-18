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

export function replaceDomain(url: string | null | undefined): string {
	if (!process.env.NEXT_PUBLIC_IS_PUBLIC_DOMAIN_DOWN) return url || "";

	if (!url) return "";

	const oldDomain = "https://cdn.sfivaz.com";
	const newDomain = "https://pub-fedebec83d6a4a24a4b4a3f5e177ddfd.r2.dev";

	if (url.startsWith(oldDomain)) {
		return url.replace(oldDomain, newDomain);
	}

	return url;
}
