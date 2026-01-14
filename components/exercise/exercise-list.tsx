"use client";

import * as React from "react";
import { useMemo, useState } from "react";

import { Search } from "lucide-react";

import { ExerciseEmptyState } from "@/components/exercise/exercise-empty-state";
import { ExerciseFormButton } from "@/components/exercise/exercise-form-button";
import { ExerciseRow } from "@/components/exercise/exercise-row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExercisesProvider, useExercises } from "@/hooks/exercise/exercises-store-context";
import { ExerciseUI } from "@/lib/exercise/type";
import { MuscleGroup } from "@/lib/generated/prisma/enums";
import { cn } from "@/lib/utils";

type ExercisesListProps = {
	initialExercises: ExerciseUI[];
};

export function ExerciseList({ initialExercises }: ExercisesListProps) {
	return (
		<ExercisesProvider initialItems={initialExercises}>
			<div>
				<div className="absolute top-0 right-0">
					<ExerciseFormButton />
				</div>

				<div className="space-y-4">
					<ExercisesListInternal />
				</div>
			</div>
		</ExercisesProvider>
	);
}

export function ExercisesListInternal() {
	const { items: exercises } = useExercises();
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedMuscle, setSelectedMuscle] = useState("all");

	// Generate unique muscle list from the exercises currently in state
	const availableMuscles = useMemo(() => {
		const muscleSet = new Set<string>();
		exercises.forEach((ex) => {
			ex.muscles.forEach((m) => muscleSet.add(m));
		});
		return ["all", ...Array.from(muscleSet).sort()];
	}, [exercises]);

	// Combine Search and Muscle filtering
	const filteredExercises = useMemo(() => {
		return exercises.filter((ex) => {
			const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());

			const matchesMuscle =
				selectedMuscle === "all" || ex.muscles.includes(selectedMuscle as MuscleGroup);

			return matchesSearch && matchesMuscle;
		});
	}, [exercises, searchQuery, selectedMuscle]);

	if (exercises.length === 0) {
		return <ExerciseEmptyState />;
	}

	return (
		<>
			{/* Search Bar */}
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

			{/* Muscle Filter Badges */}
			<div className="scrollbar-hide mb-6 flex gap-3 overflow-x-auto pb-2">
				{availableMuscles.map((muscle) => (
					<Button
						key={muscle}
						type="button"
						variant={selectedMuscle === muscle ? "default" : "outline"}
						onClick={() => setSelectedMuscle(muscle)}
						className={cn(
							"rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap capitalize",
							selectedMuscle === muscle && "bg-orange-500 hover:bg-orange-600",
						)}
					>
						{muscle}
					</Button>
				))}
			</div>

			{/* Filtered Results */}
			<div className="flex flex-col gap-4">
				{filteredExercises.length > 0 ? (
					filteredExercises.map((exercise) => <ExerciseRow key={exercise.id} exercise={exercise} />)
				) : (
					<div className="text-muted-foreground rounded-xl border-2 border-dashed py-10 text-center">
						No exercises match your filters.
					</div>
				)}
			</div>
		</>
	);
}
