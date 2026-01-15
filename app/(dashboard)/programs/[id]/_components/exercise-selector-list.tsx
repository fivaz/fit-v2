"use client";

import * as React from "react";

import { ExerciseSelectorItem } from "@/app/(dashboard)/programs/[id]/_components/exercise-selector-item";
import { ExerciseEmptyState } from "@/components/exercise/exercise-empty-state";
import { ExerciseFilterShell, NoResultsFound } from "@/components/exercise/exercise-filter-shell";
import { ExerciseFormButton } from "@/components/exercise/exercise-form-button";
import { ExercisesProvider, useExercises } from "@/hooks/exercise/exercises-store-context";
import { useExerciseFilters } from "@/hooks/exercise/use-exercise-filters";
import { ExerciseUI } from "@/lib/exercise/type";

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
						<ExerciseSelectorItem
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
