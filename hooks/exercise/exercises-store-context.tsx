"use client";

import { createOptimisticManagerContext } from "@/hooks/optimistic-manager/create-optimistic-manager-context";
import {
	deleteExerciseAction,
	reorderProgramExercisesAction,
	saveExerciseAction,
} from "@/lib/exercise/actions";
import { ExerciseUI } from "@/lib/exercise/type";
import { updateProgramExercisesAction } from "@/lib/program/actions";

export const [ExercisesProvider, useExercises] = createOptimisticManagerContext<ExerciseUI>({
	// ---- ADD ----
	addConfig: {
		function: saveExerciseAction,
		onSuccessMessage: "Exercise created successfully.",
		onErrorMessage: "Failed to create exercise.",
	},

	// ---- UPDATE ----
	updateConfig: {
		function: saveExerciseAction,
		onSuccessMessage: "Exercise updated successfully.",
		onErrorMessage: "Failed to update exercise.",
	},

	// ---- DELETE ----
	deleteConfig: {
		function: deleteExerciseAction,
		onSuccessMessage: "Exercise deleted successfully.",
		onErrorMessage: "Failed to delete exercise.",
	},

	reorderConfig: {
		function: (ids: string[], parentId?: string) => {
			if (!parentId) throw new Error("parentId is required for program exercises");
			return reorderProgramExercisesAction(ids, parentId);
		},
		onErrorMessage: "Failed to reorder program's exercises.",
	},

	syncConfig: {
		function: updateProgramExercisesAction,
		onSuccessMessage: "Exercises updated successfully.",
		onErrorMessage: "Failed to update exercises.",
	},
});
