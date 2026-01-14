"use client";

import React, { useState } from "react";

import { motion } from "framer-motion";
import { Activity, ChevronRight, Dumbbell, LogOut, Palette, Scale, Zap } from "lucide-react";

import { ProfileDrawer } from "@/components/settings/profile-drawer";
import { ThemeToggle } from "@/components/settings/theme-toggle";
import { Button } from "@/components/ui/button";

const VERSION = "1.0.42-beta";

const MOCK_USER = {
	full_name: "John Doe",
	email: "john@example.com",
	weight: "82.5",
	bodyFat: "18.2",
	muscleMass: "42.5",
	visceralFat: "7",
};

export function SettingsDetail() {
	const [showDrawer, setShowDrawer] = useState(false);

	const bodyMetrics = [
		{ icon: Scale, label: "Weight", value: `${MOCK_USER.weight} kg` },
		{ icon: Activity, label: "Body Fat", value: `${MOCK_USER.bodyFat}%` },
		{ icon: Dumbbell, label: "Muscle Mass", value: `${MOCK_USER.muscleMass}%` },
		{ icon: Zap, label: "Visceral Fat", value: `Lvl ${MOCK_USER.visceralFat}` },
	];

	return (
		<div className="min-h-screen bg-gray-50 pb-12 dark:bg-gray-900">
			<div className="px-5 pt-12 pb-6">
				<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
			</div>

			{/* User Card */}
			<div className="mb-6 px-5">
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800"
				>
					<div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-xl font-bold text-white shadow-inner">
						{MOCK_USER.full_name.charAt(0)}
					</div>
					<div className="flex-1">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
							{MOCK_USER.full_name}
						</h2>
						<p className="text-sm text-gray-500 dark:text-gray-400">{MOCK_USER.email}</p>
					</div>
				</motion.div>
			</div>

			<div className="space-y-6 px-5 pb-8">
				{/* Body Composition Group */}
				<div>
					<h3 className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
						Body Stats
					</h3>
					<div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-800">
						{bodyMetrics.map((item, idx) => (
							<div
								key={item.label}
								onClick={() => setShowDrawer(true)}
								className={`flex cursor-pointer items-center justify-between p-4 transition-colors active:bg-gray-50 dark:active:bg-gray-700/50 ${idx < bodyMetrics.length - 1 ? "border-b border-gray-50 dark:border-gray-700" : ""}`}
							>
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-900/20">
										<item.icon className="h-5 w-5 text-orange-500" />
									</div>
									<span className="font-medium dark:text-white">{item.label}</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-sm font-bold text-gray-900 dark:text-white">
										{item.value}
									</span>
									<ChevronRight className="h-4 w-4 text-gray-300" />
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Preferences Group */}
				<div>
					<h3 className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
						Preferences
					</h3>
					<div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-800">
						<div className="flex items-center justify-between p-4">
							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700">
									<Palette className="h-5 w-5 text-gray-600 dark:text-gray-300" />
								</div>
								<span className="font-medium dark:text-white">Theme</span>
							</div>
							<ThemeToggle />
						</div>
					</div>
				</div>

				{/* Logout */}
				<div className="pt-2">
					<Button
						variant="outline"
						className="h-12 w-full rounded-xl border-red-100 text-red-500 hover:bg-red-50 dark:border-red-900/30"
					>
						<LogOut className="mr-2 h-5 w-5" /> Sign Out
					</Button>
					<div className="mt-6 flex flex-col items-center justify-center gap-1 opacity-30">
						<span className="text-[10px] font-bold tracking-widest uppercase dark:text-white">
							Build with Passion
						</span>
						<span className="text-xs font-medium dark:text-white">Version {VERSION}</span>
					</div>
				</div>
			</div>

			<ProfileDrawer
				isOpen={showDrawer}
				onClose={() => setShowDrawer(false)}
				initialData={MOCK_USER}
			/>
		</div>
	);
}
