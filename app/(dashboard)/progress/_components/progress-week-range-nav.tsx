"use client";

import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type ProgressWeekRangeNavProps = {
	currentWeekStart: Date;
	currentWeekEnd: Date;
	weekOffset: number;
	onPreviousWeek: () => void;
	onNextWeek: () => void;
};

export function ProgressWeekRangeNav({
	currentWeekStart,
	currentWeekEnd,
	weekOffset,
	onPreviousWeek,
	onNextWeek,
}: ProgressWeekRangeNavProps) {
	return (
		<div className="mb-4 flex items-center justify-between">
			<Button variant="ghost" size="icon" onClick={onPreviousWeek} className="rounded-xl">
				<ChevronLeft className="h-5 w-5" />
			</Button>
			<p className="text-sm font-medium text-gray-700 dark:text-gray-300">
				{format(currentWeekStart, "MMM d")} - {format(currentWeekEnd, "MMM d, yyyy")}
			</p>
			<Button
				variant="ghost"
				size="icon"
				onClick={onNextWeek}
				disabled={weekOffset === 0}
				className="rounded-xl"
			>
				<ChevronRight className="h-5 w-5" />
			</Button>
		</div>
	);
}
