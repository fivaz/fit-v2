import { ROUTES } from "@/lib/consts";

export function readProgramsSelectedId(): string | null {
	if (typeof window === "undefined") return null;
	return new URLSearchParams(window.location.search).get("id")?.trim() || null;
}

export function programsDetailUrl(programId: string): string {
	return `${ROUTES.PROGRAMS}?id=${encodeURIComponent(programId)}`;
}

export function pushProgramsSelectedId(programId: string | null): void {
	if (typeof window === "undefined") return;
	const next = programId ? programsDetailUrl(programId) : ROUTES.PROGRAMS;
	window.history.pushState({}, "", next);
}
