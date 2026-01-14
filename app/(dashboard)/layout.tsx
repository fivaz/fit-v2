import { ReactNode } from "react";

import { AppLayout } from "@/components/app-layout";

type DashboardLayoutType = {
	children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutType) {
	return <AppLayout>{children}</AppLayout>;
}
