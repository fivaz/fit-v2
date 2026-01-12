"use client";

import { ExerciseEmptyState } from "@/components/exercise/exercise-empty-state";
import { ExerciseFormButton } from "@/components/exercise/exercise-form-button";
import { ExerciseRow } from "@/components/exercise/exercise-row";
import { ExercisesProvider, useExercises } from "@/hooks/exercise/exercises-store-context";
import { ExerciseUI } from "@/lib/exercise/type";

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

	if (exercises.length === 0) {
		return <ExerciseEmptyState />;
	}

	return (
		<div className="flex flex-col gap-4">
			{exercises.map((exercise) => (
				<ExerciseRow key={exercise.id} exercise={exercise} />
			))}
		</div>
	);
}
