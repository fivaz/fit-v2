"use client";

import * as React from "react";

import { ExerciseSelectorItem } from "@/app/(dashboard)/programs/[id]/_components/exercise-selector-item";
import { ExerciseEmptyState } from "@/components/exercise/exercise-empty-state";
import { ExerciseFilterShell, NoResultsFound } from "@/components/exercise/exercise-filter-shell";
import { ExerciseFormButton } from "@/components/exercise/exercise-form-button";
import { useExerciseFilters } from "@/hooks/exercise/use-exercise-filters";
import { ExerciseUI } from "@/lib/exercise/type";
import { MuscleGroupType } from "@/lib/muscle/type";

interface ExerciseSelectorListProps {
	exercises: ExerciseUI[];
	muscles: MuscleGroupType[];
	selected: ExerciseUI[];
	onToggle: (exercise: ExerciseUI) => void;
}

export function ExerciseSelectorList({
	exercises,
	selected,
	onToggle,
	muscles,
}: ExerciseSelectorListProps) {
	const filterData = useExerciseFilters(muscles);
	const { filteredExercises } = filterData;

	if (exercises.length === 0) return <ExerciseEmptyState />;

	return (
		<div className="relative pt-2">
			{/* Floating action button stays consistent */}
			<div className="absolute -top-12 right-0">
				<ExerciseFormButton variant="ghost" size="sm" />
			</div>

			<div className="space-y-4">
				<ExerciseFilterShell {...filterData} />

				<div className="flex flex-col gap-3">
					{filteredExercises.length > 0 ? (
						filteredExercises.map((exercise) => (
							<ExerciseSelectorItem
								key={exercise.id}
								exercise={exercise}
								isSelected={selected.some(({ id }) => id === exercise.id)}
								onToggle={() => onToggle(exercise)}
							/>
						))
					) : (
						<NoResultsFound />
					)}
				</div>
			</div>
		</div>
	);
}
