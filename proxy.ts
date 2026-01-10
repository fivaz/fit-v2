import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { ROUTES } from "@/lib/consts";

const PUBLIC_PATHS = [ROUTES.LOGIN, ROUTES.REGISTER, "/logout"];

export async function proxy(req: NextRequest) {
	const pathname = req.nextUrl.pathname;

	if (PUBLIC_PATHS.includes(pathname)) {
		return NextResponse.next();
	}

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		console.warn(`[PROXY] No token found for: ${pathname}. Redirecting to Login.`);
		return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - .well-known (security/manifest files)
		 * - All files with extensions (e.g., .svg, .png, .jpg, .json)
		 */
		"/((?!api|_next/static|_next/image|.well-known|favicon.ico|sw.js|manifest.json|.*\\..*).*)",
	],
};
