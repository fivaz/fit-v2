import * as React from "react";

import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { toast } from "sonner";

import { ProgramExerciseRow } from "@/app/(dashboard)/programs/[id]/_components/program–exercise-row";
import { ExerciseEmptyState } from "@/components/exercise/exercise-empty-state";
import { useExerciseMutations, useExercisesStore } from "@/hooks/exercise/store";
import { reorderProgramExercisesAction } from "@/lib/exercise/actions";
import { OrderedExercise } from "@/lib/program/type";
import { sameOrder } from "@/lib/utils";

type ProgramExerciseListProps = {
	programId: string;
};

/**
 * Renders a program's ordered list of exercises with drag-and-drop reordering and an empty state.
 *
 * Reordering updates local state and persists the new order to the backend; if persistence fails an error toast is shown.
 *
 * @param programId - Identifier of the program whose exercises are displayed
 * @returns The React element containing the exercise list, drag-and-drop handlers, and empty-state UI
 */
export function ProgramExerciseList({ programId }: ProgramExerciseListProps) {
	const { items } = useExercisesStore();
	const { setItems } = useExerciseMutations();

	const exercises = (items as OrderedExercise[]).toSorted((a, b) => a.order - b.order);

	if (exercises.length === 0) return <ExerciseEmptyState />;

	return (
		<DragDropProvider
			onDragEnd={(event) => {
				const nextItems = move(exercises, event);

				if (sameOrder(exercises, nextItems)) return;

				setItems(nextItems, {
					persist: () =>
						reorderProgramExercisesAction(
							programId,
							nextItems.map((e) => e.id),
						),
					onError: () => toast.error("Failed to reorder program's exercises."),
				});
			}}
		>
			<div className="flex flex-col gap-4">
				{exercises.map((exercise, index) => (
					<ProgramExerciseRow key={exercise.id} exercise={exercise} index={index} />
				))}
			</div>
			<div className="mb-28"></div>
		</DragDropProvider>
	);
}