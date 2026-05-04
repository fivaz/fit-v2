"use client";

import { motion } from "framer-motion";
import { Clock, Flame } from "lucide-react";

import type { ProgressWorkoutLog } from "./progress-types";

type ProgressLogCardProps = {
	log: ProgressWorkoutLog;
	programName: string;
};

export function ProgressLogCard({ log, programName }: ProgressLogCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className="rounded-2xl bg-white p-4 dark:bg-gray-800"
		>
			<div className="mb-3 flex items-start justify-between">
				<div>
					<h4 className="font-semibold text-gray-900 dark:text-white">{programName}</h4>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						{log.exercises_completed} exercises
					</p>
				</div>
			</div>
			<div className="flex gap-4">
				<div className="flex items-center gap-1.5">
					<Clock className="h-4 w-4 text-blue-500" />
					<span className="text-sm text-gray-600 dark:text-gray-300">
						{log.duration_minutes} min
					</span>
				</div>
				<div className="flex items-center gap-1.5">
					<Flame className="h-4 w-4 text-red-500" />
					<span className="text-sm text-gray-600 dark:text-gray-300">
						{log.calories_burned} cal
					</span>
				</div>
			</div>
			{log.notes ? (
				<p className="mt-3 border-t border-gray-100 pt-3 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
					{log.notes}
				</p>
			) : null}
		</motion.div>
	);
}
