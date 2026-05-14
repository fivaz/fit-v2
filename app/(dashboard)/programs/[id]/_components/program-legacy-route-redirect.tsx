"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/lib/consts";
import { programsDetailUrl } from "@/lib/programs/navigation";

type ProgramLegacyRouteRedirectProps = {
	programId: string;
};

/** `/programs/[id]` → `/programs?id=` so list + detail stay on one SPA shell (web + Capacitor). */
export function ProgramLegacyRouteRedirect({ programId }: ProgramLegacyRouteRedirectProps) {
	const router = useRouter();

	useEffect(() => {
		if (programId === "placeholder") {
			router.replace(ROUTES.PROGRAMS);
			return;
		}
		router.replace(programsDetailUrl(programId));
	}, [programId, router]);

	return <div className="py-8 text-sm text-gray-500">Loading program...</div>;
}
