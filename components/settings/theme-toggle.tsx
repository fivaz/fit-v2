"use client";

import { useTheme } from "next-themes";

import { motion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	const themes = [
		{ value: "light", icon: Sun },
		{ value: "dark", icon: Moon },
		{ value: "system", icon: Monitor },
	] as const;

	return (
		<div className="relative flex w-36 rounded-xl bg-gray-100 p-1 dark:bg-gray-700">
			{/* Animated Background Pill */}
			<motion.div
				className="absolute inset-y-1 rounded-lg bg-white shadow-sm dark:bg-gray-600"
				initial={false}
				animate={{
					x: theme === "light" ? 0 : theme === "dark" ? "112.5%" : "225%",
				}}
				transition={{ type: "spring", stiffness: 400, damping: 35 }}
				style={{ width: "30%" }}
			/>

			{themes.map(({ value, icon: Icon }) => (
				<button
					key={value}
					onClick={() => setTheme(value)}
					className={`relative z-10 flex flex-1 items-center justify-center py-1.5 transition-colors ${
						theme === value
							? "text-orange-600 dark:text-orange-400"
							: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
					}`}
				>
					<Icon className="size-4" />
				</button>
			))}
		</div>
	);
}
