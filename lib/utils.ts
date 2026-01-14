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
