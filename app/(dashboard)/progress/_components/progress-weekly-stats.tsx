"use client";

import { motion } from "framer-motion";
import { Clock, Dumbbell, Flame, TrendingUp } from "lucide-react";

import type { ProgressWeeklyStats } from "./progress-types";

type ProgressWeeklyStatsProps = {
	stats: ProgressWeeklyStats;
};

export function ProgressWeeklyStatsGrid({ stats }: ProgressWeeklyStatsProps) {
	return (
		<div className="mb-6 grid grid-cols-2 gap-3">
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				className="rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-4 text-white"
			>
				<Dumbbell className="mb-2 h-6 w-6 opacity-80" />
				<p className="text-3xl font-bold">{stats.workouts}</p>
				<p className="text-sm text-white/70">Workouts</p>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.05 }}
				className="rounded-2xl bg-white p-4 dark:bg-gray-800"
			>
				<Clock className="mb-2 h-6 w-6 text-blue-500" />
				<p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalMinutes}</p>
				<p className="text-sm text-gray-500 dark:text-gray-400">Minutes</p>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className="rounded-2xl bg-white p-4 dark:bg-gray-800"
			>
				<Flame className="mb-2 h-6 w-6 text-red-500" />
				<p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalCalories}</p>
				<p className="text-sm text-gray-500 dark:text-gray-400">Calories</p>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.15 }}
				className="rounded-2xl bg-white p-4 dark:bg-gray-800"
			>
				<TrendingUp className="mb-2 h-6 w-6 text-green-500" />
				<p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.avgDuration}</p>
				<p className="text-sm text-gray-500 dark:text-gray-400">Avg min</p>
			</motion.div>
		</div>
	);
}
