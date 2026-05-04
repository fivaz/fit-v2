"use client";

import { useMemo, useState } from "react";

import { eachDayOfInterval, endOfWeek, isSameDay, startOfWeek, subDays } from "date-fns";

import { ProgressDayLogs } from "./_components/progress-day-logs";
import { ProgressHeader } from "./_components/progress-header";
import type {
	ProgressProgramOption,
	ProgressWeeklyStats,
	ProgressWorkoutLog,
} from "./_components/progress-types";
import { ProgressWeekDayStrip } from "./_components/progress-week-day-strip";
import { ProgressWeekRangeNav } from "./_components/progress-week-range-nav";
import { ProgressWeeklyStatsGrid } from "./_components/progress-weekly-stats";

export default function ProgressPage() {
	const [, setShowLogModal] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [weekOffset, setWeekOffset] = useState(0);

	const currentWeekStart = useMemo(() => {
		const today = new Date();
		const start = startOfWeek(today, { weekStartsOn: 1 });
		return subDays(start, weekOffset * 7);
	}, [weekOffset]);

	const currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });
	const weekDays = eachDayOfInterval({ start: currentWeekStart, end: currentWeekEnd });

	// ─────────────────────────────────────────────
	// Dummy data — DESIGN ONLY
	// ─────────────────────────────────────────────

	const programs: ProgressProgramOption[] = [
		{ id: "p1", name: "Push Day" },
		{ id: "p2", name: "Pull Day" },
		{ id: "p3", name: "Leg Day" },
	];

	const logsLoading = false;

	const logs: ProgressWorkoutLog[] = [
		{
			id: "l1",
			date: new Date(),
			program_id: "p1",
			duration_minutes: 45,
			exercises_completed: 6,
			calories_burned: 420,
			notes: "Felt strong today 💪",
		},
		{
			id: "l2",
			date: subDays(new Date(), 2),
			program_id: "p2",
			duration_minutes: 35,
			exercises_completed: 5,
			calories_burned: 310,
			notes: "",
		},
	];

	function hasWorkout(day: Date) {
		return logs.some((log) => isSameDay(log.date, day));
	}

	const weeklyStats: ProgressWeeklyStats = {
		workouts: 4,
		totalMinutes: 155,
		totalCalories: 1280,
		avgDuration: 39,
	};

	const openLogModal = () => setShowLogModal(true);

	return (
		<>
			<div className="pb-6">
				<ProgressHeader onAddLog={openLogModal} />
				<ProgressWeeklyStatsGrid stats={weeklyStats} />
				<ProgressWeekRangeNav
					currentWeekStart={currentWeekStart}
					currentWeekEnd={currentWeekEnd}
					weekOffset={weekOffset}
					onPreviousWeek={() => setWeekOffset((prev) => prev + 1)}
					onNextWeek={() => setWeekOffset((prev) => Math.max(0, prev - 1))}
				/>
				<ProgressWeekDayStrip
					weekDays={weekDays}
					selectedDate={selectedDate}
					onSelectDate={setSelectedDate}
					hasWorkout={hasWorkout}
				/>
			</div>

			<ProgressDayLogs
				selectedDate={selectedDate}
				logsLoading={logsLoading}
				logs={logs}
				programs={programs}
				onAddLog={openLogModal}
			/>
		</>
	);
}
