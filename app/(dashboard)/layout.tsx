"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { AppLayout } from "@/components/app-layout";
import { ROUTES } from "@/lib/consts";

type DashboardLayoutType = {
	children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutType) {
	const pathname = usePathname();

	const isWorkoutPage = pathname?.startsWith(ROUTES.WORKOUT);

	if (isWorkoutPage) {
		return <>{children}</>;
	}

	return <AppLayout>{children}</AppLayout>;
}
