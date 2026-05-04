"use client";

import { format, isSameDay } from "date-fns";

type ProgressWeekDayStripProps = {
	weekDays: Date[];
	selectedDate: Date;
	onSelectDate: (day: Date) => void;
	hasWorkout: (day: Date) => boolean;
};

export function ProgressWeekDayStrip({
	weekDays,
	selectedDate,
	onSelectDate,
	hasWorkout,
}: ProgressWeekDayStripProps) {
	return (
		<div className="flex gap-2">
			{weekDays.map((day) => {
				const isSelected = isSameDay(day, selectedDate);
				const isToday = isSameDay(day, new Date());
				const hasLog = hasWorkout(day);

				return (
					<button
						key={day.toISOString()}
						type="button"
						onClick={() => onSelectDate(day)}
						className={`flex flex-1 flex-col items-center rounded-xl py-3 transition-all ${
							isSelected
								? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
								: "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300"
						}`}
					>
						<span className="text-xs opacity-70">{format(day, "EEE")}</span>
						<span className="mt-0.5 text-lg font-semibold">{format(day, "d")}</span>
						{hasLog && !isSelected && (
							<div className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-500" />
						)}
						{isToday && !isSelected && (
							<div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
						)}
					</button>
				);
			})}
		</div>
	);
}
