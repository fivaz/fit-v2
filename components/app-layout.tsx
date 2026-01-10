"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	DumbbellIcon,
	HomeIcon,
	NotebookTabsIcon,
	Settings2Icon,
	TrendingUpIcon,
} from "lucide-react";

import { ROUTES } from "@/lib/consts";

type AppLayoutProps = {
	children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
	const pathname = usePathname();

	const navItems = [
		{ icon: HomeIcon, label: "Home", href: ROUTES.HOME },
		{ icon: NotebookTabsIcon, label: "Programs", href: ROUTES.PROGRAMS },
		{ icon: DumbbellIcon, label: "Exercises", href: ROUTES.EXERCISES },
		{ icon: TrendingUpIcon, label: "Progress", href: ROUTES.PROGRESS },
		{ icon: Settings2Icon, label: "Settings", href: ROUTES.SETTINGS },
	];

	return (
		<>
			<main className="mx-auto max-w-md pb-18">{children}</main>

			{/* Persistent Bottom Navigation */}
			<nav className="safe-area-bottom fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
				<div className="mx-auto flex max-w-md items-center justify-between px-2 py-2">
					{navItems.map((item) => {
						const isActive = pathname === item.href;
						const Icon = item.icon;

						return (
							<Link
								key={item.href}
								href={item.href}
								aria-current={isActive ? "page" : undefined}
								className={`flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-all active:scale-90 ${
									isActive
										? "text-orange-500"
										: "text-gray-600 hover:text-gray-700 dark:text-gray-400"
								}`}
							>
								<Icon className={`size-6 ${isActive ? "text-orange-500" : ""}`} />
								<span className="text-xs">{item.label}</span>
							</Link>
						);
					})}
				</div>
			</nav>
		</>
	);
}
