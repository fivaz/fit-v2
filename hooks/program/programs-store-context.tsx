"use client";

import { createOptimisticManagerContext } from "@/hooks/optimistic-manager/create-optimistic-manager-context";
import { deleteProgram, reorderPrograms, saveProgram } from "@/lib/program/actions";
import { ProgramUI } from "@/lib/program/type";

export const [ProgramsProvider, usePrograms] = createOptimisticManagerContext<ProgramUI>({
	sortFnc: (items) => items.sort((a, b) => a.order - b.order),
	// ---- ADD ----
	addConfig: {
		function: saveProgram,
		onSuccessMessage: "Program created successfully.",
		onErrorMessage: "Failed to create program.",
	},

	// ---- UPDATE ----
	updateConfig: {
		function: saveProgram,
		onSuccessMessage: "Program updated successfully.",
		onErrorMessage: "Failed to update program.",
	},

	// ---- DELETE ----
	deleteConfig: {
		function: deleteProgram,
		onSuccessMessage: "Program deleted successfully.",
		onErrorMessage: "Failed to delete program.",
	},

	reorderConfig: {
		function: reorderPrograms,
		onErrorMessage: "Failed to reorder programs.",
	},
});
