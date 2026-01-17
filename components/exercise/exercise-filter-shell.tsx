"use client";

import * as React from "react";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MuscleGroup } from "@/lib/generated/prisma/enums";
import { MuscleGroupType, SearchableMuscle } from "@/lib/muscle/type";
import { cn } from "@/lib/utils";

export interface ExerciseFilterShellProps {
	searchQuery: string;
	setSearchQuery: (val: string) => void;
	selectedMuscles: SearchableMuscle[];
	setSelectedMuscles: (val: SearchableMuscle[]) => void;
	availableMuscles: MuscleGroupType[];
}

export function ExerciseFilterShell({
	searchQuery,
	setSearchQuery,
	selectedMuscles,
	setSelectedMuscles,
	availableMuscles,
}: ExerciseFilterShellProps) {
	return (
		<>
			{/* Search Section */}
			<div className="mb-4">
				<div className="relative">
					<Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
					<Input
						type="text"
						placeholder="Search exercises..."
						className="rounded-xl pl-12"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>

			{/* Filter Section */}
			<div className="scrollbar-hide mb-6 flex gap-3 overflow-x-auto pb-2">
				{availableMuscles.map((muscle) => (
					<Button
						key={muscle}
						type="button"
						variant={selectedMuscles.includes(muscle) ? "default" : "outline"}
						className={cn(
							"rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap capitalize",
							selectedMuscles.includes(muscle) && "bg-orange-500 hover:bg-orange-600",
						)}
					>
						{muscle}
					</Button>
				))}
			</div>
		</>
	);
}

export function NoResultsFound() {
	return (
		<div className="text-muted-foreground rounded-xl border-2 border-dashed py-10 text-center">
			No exercises match your filters.
		</div>
	);
}
