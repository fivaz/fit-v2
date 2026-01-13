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
import { cn } from "@/lib/utils";

type AppLayoutProps = {
	children: ReactNode;
	className?: string;
};

export function AppLayout({ children, className }: AppLayoutProps) {
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
			<main
				className={cn(
					className,
					"min-h-svh bg-gray-50 pb-20 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-white",
				)}
			>
				{children}
			</main>

			{/* Persistent Bottom Navigation */}
			<nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white px-2 py-2 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800">
				<div className="mx-auto flex max-w-md items-center justify-around">
					{navItems.map((item) => {
						const isActive = pathname === item.href;
						const Icon = item.icon;

						return (
							<Link
								key={item.href}
								href={item.href}
								aria-current={isActive ? "page" : undefined}
								className={`flex flex-col items-center justify-center rounded-xl px-3 py-1.5 transition-all duration-200 ${
									isActive
										? "bg-orange-50 text-orange-500 dark:bg-orange-500/10"
										: "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
								}`}
							>
								<Icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : ""}`} />
								<span className="mt-0.5 text-[10px] font-medium">{item.label}</span>
							</Link>
						);
					})}
				</div>
			</nav>
		</>
	);
}
