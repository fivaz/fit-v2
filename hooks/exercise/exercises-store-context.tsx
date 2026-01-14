"use client";

import { createOptimisticStoreContext } from "@/hooks/optimistic-store/create-optimistic-store-context";
import { deleteExercise, reorderProgramExercises, saveExercise } from "@/lib/exercise/actions";
import { ExerciseUI } from "@/lib/exercise/type";

export const [ExercisesProvider, useExercises] = createOptimisticStoreContext<ExerciseUI>({
	sortFnc: (items) => items.sort((a, b) => a.name.localeCompare(b.name)),
	// ---- ADD ----
	addConfig: {
		function: saveExercise,
		onSuccessMessage: "Exercise created successfully.",
		onErrorMessage: "Failed to create exercise.",
	},

	// ---- UPDATE ----
	updateConfig: {
		function: saveExercise,
		onSuccessMessage: "Exercise updated successfully.",
		onErrorMessage: "Failed to update exercise.",
	},

	// ---- DELETE ----
	deleteConfig: {
		function: deleteExercise,
		onSuccessMessage: "Exercise deleted successfully.",
		onErrorMessage: "Failed to delete exercise.",
	},

	reorderConfig: {
		function: (ids: string[], parentId?: string) => {
			if (!parentId) throw new Error("parentId is required for program exercises");
			return reorderProgramExercises(ids, parentId);
		},
		onErrorMessage: "Failed to reorder program's exercises.",
	},
});
