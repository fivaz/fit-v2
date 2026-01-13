"use client";

import * as React from "react";

import { ExerciseEmptyState } from "@/components/exercise/exercise-empty-state";
import { ExerciseFormButton } from "@/components/exercise/exercise-form-button";
import { ExerciseRow } from "@/components/exercise/exercise-row";
import { ExercisesProvider, useExercises } from "@/hooks/exercise/exercises-store-context";
import { useExerciseFilters } from "@/hooks/exercise/use-exercise-filters";
import { ExerciseUI } from "@/lib/exercise/type";

import { ExerciseFilterShell, NoResultsFound } from "./exercise-filter-shell";

type ExerciseLibraryListProps = {
	initialExercises: ExerciseUI[];
};

export function ExerciseLibraryList({ initialExercises }: ExerciseLibraryListProps) {
	return (
		<ExercisesProvider initialItems={initialExercises}>
			<div className="absolute top-0 right-0">
				<ExerciseFormButton size="icon-lg" />
			</div>

			<div className="space-y-4">
				<LibraryInternal />
			</div>
		</ExercisesProvider>
	);
}

function LibraryInternal() {
	const { items: exercises } = useExercises();

	const filterData = useExerciseFilters(exercises);
	const { filteredExercises } = filterData;

	if (exercises.length === 0) return <ExerciseEmptyState />;

	return (
		<>
			{/* Reusable Filter UI */}
			<ExerciseFilterShell {...filterData} />

			{/* Management Results Section */}
			<div className="flex flex-col gap-4">
				{filteredExercises.length > 0 ? (
					filteredExercises.map((exercise) => <ExerciseRow key={exercise.id} exercise={exercise} />)
				) : (
					<NoResultsFound />
				)}
			</div>
		</>
	);
}
