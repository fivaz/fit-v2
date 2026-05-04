"use client";

import { format, isSameDay } from "date-fns";
import { Dumbbell, Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ProgressLogCard } from "./progress-log-card";
import type { ProgressProgramOption, ProgressWorkoutLog } from "./progress-types";

type ProgressDayLogsProps = {
	selectedDate: Date;
	logsLoading: boolean;
	logs: ProgressWorkoutLog[];
	programs: ProgressProgramOption[];
	onAddLog: () => void;
};

export function ProgressDayLogs({
	selectedDate,
	logsLoading,
	logs,
	programs,
	onAddLog,
}: ProgressDayLogsProps) {
	const selectedDateLogs = logs.filter((log) => isSameDay(log.date, selectedDate));

	return (
		<div>
			<h3 className="mb-3 text-sm font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
				{format(selectedDate, "EEEE, MMMM d")}
			</h3>

			{logsLoading ? (
				<div className="flex justify-center py-8">
					<Loader2 className="h-6 w-6 animate-spin text-orange-500" />
				</div>
			) : selectedDateLogs.length === 0 ? (
				<div className="rounded-2xl bg-white py-8 text-center dark:bg-gray-800">
					<Dumbbell className="mx-auto mb-3 h-12 w-12 text-gray-300 dark:text-gray-600" />
					<p className="mb-4 text-gray-500 dark:text-gray-400">No workouts logged</p>
					<Button onClick={onAddLog} className="bg-orange-500 text-white hover:bg-orange-600">
						<Plus className="mr-2 h-4 w-4" />
						Log Workout
					</Button>
				</div>
			) : (
				<div className="space-y-3">
					{selectedDateLogs.map((log) => {
						const program = programs.find((p) => p.id === log.program_id);
						const programName = program?.name ?? "General Workout";
						return <ProgressLogCard key={log.id} log={log} programName={programName} />;
					})}
				</div>
			)}
		</div>
	);
}
