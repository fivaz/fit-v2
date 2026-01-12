"use client";

import * as React from "react";

import { ExerciseEmptyState } from "@/components/exercise/exercise-empty-state";
import { ExerciseFormButton } from "@/components/exercise/exercise-form-button";
import { ProgramExerciseRow } from "@/components/exercise/program-exercise-row";
import { ExercisesProvider, useExercises } from "@/hooks/exercise/exercises-store-context";
import { useExerciseFilters } from "@/hooks/exercise/use-exercise-filters";
import { ExerciseUI } from "@/lib/exercise/type";

import { ExerciseFilterShell, NoResultsFound } from "./exercise-filter-shell";

interface ExerciseSelectorListProps {
	initialExercises: ExerciseUI[];
	selectedIds: string[];
	onToggle: (id: string) => void;
}

export function ExerciseSelectorList({
	initialExercises,
	selectedIds,
	onToggle,
}: ExerciseSelectorListProps) {
	return (
		<ExercisesProvider initialItems={initialExercises}>
			<div className="relative pt-2">
				{/* Floating action button stays consistent */}
				<div className="absolute -top-12 right-0">
					<ExerciseFormButton variant="ghost" size="sm" />
				</div>

				<div className="space-y-4">
					<SelectorInternal selectedIds={selectedIds} onToggle={onToggle} />
				</div>
			</div>
		</ExercisesProvider>
	);
}

function SelectorInternal({
	selectedIds,
	onToggle,
}: Pick<ExerciseSelectorListProps, "selectedIds" | "onToggle">) {
	const { items: exercises } = useExercises();

	// Use the shared filtering hook
	const filterData = useExerciseFilters(exercises);
	const { filteredExercises } = filterData;

	if (exercises.length === 0) return <ExerciseEmptyState />;

	return (
		<>
			<ExerciseFilterShell {...filterData} />

			<div className="flex flex-col gap-3">
				{filteredExercises.length > 0 ? (
					filteredExercises.map((exercise) => (
						<ProgramExerciseRow
							key={exercise.id}
							exercise={exercise}
							isSelected={selectedIds.includes(exercise.id)}
							onToggle={() => onToggle(exercise.id)}
						/>
					))
				) : (
					<NoResultsFound />
				)}
			</div>
		</>
	);
}
