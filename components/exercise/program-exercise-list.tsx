import * as React from "react";

import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";

import { ExerciseEmptyState } from "@/components/exercise/exercise-empty-state";
import { ProgramExerciseRow } from "@/components/exercise/program–exercise-row";
import { useExercises } from "@/hooks/exercise/exercises-store-context";
import { sameOrder } from "@/lib/utils";

type ProgramExerciseListProps = {
	programId: string;
};

export function ProgramExerciseList({ programId }: ProgramExerciseListProps) {
	const { items: exercises, reorderItems } = useExercises();

	if (exercises.length === 0) return <ExerciseEmptyState />;

	return (
		<DragDropProvider
			onDragEnd={(event) => {
				const nextItems = move(exercises, event);

				if (sameOrder(exercises, nextItems)) return;

				reorderItems(nextItems, programId);
			}}
		>
			<div className="flex flex-col gap-3">
				{exercises.map((exercise, index) => (
					<ProgramExerciseRow key={exercise.id} exercise={exercise} index={index} />
				))}
			</div>
		</DragDropProvider>
	);
}
