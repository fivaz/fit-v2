"use client";

import { createOptimisticManagerContext } from "@/hooks/optimistic-manager/create-optimistic-manager-context";
import {
	deleteProgramAction,
	reorderProgramsAction,
	saveProgramAction,
} from "@/lib/program/actions";
import { ProgramUI } from "@/lib/program/type";

export const [ProgramsProvider, usePrograms] = createOptimisticManagerContext<ProgramUI>({
	// ---- ADD ----
	addConfig: {
		function: saveProgramAction,
		onSuccessMessage: "Program created successfully.",
		onErrorMessage: "Failed to create program.",
	},

	// ---- UPDATE ----
	updateConfig: {
		function: saveProgramAction,
		onSuccessMessage: "Program updated successfully.",
		onErrorMessage: "Failed to update program.",
	},

	// ---- DELETE ----
	deleteConfig: {
		function: deleteProgramAction,
		onSuccessMessage: "Program deleted successfully.",
		onErrorMessage: "Failed to delete program.",
	},

	reorderConfig: {
		function: reorderProgramsAction,
		onErrorMessage: "Failed to reorder programs.",
	},
});
