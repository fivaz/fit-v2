"use client";

import { createOptimisticStoreContext } from "@/hooks/optimistic-store/create-optimistic-store-context";
import { saveProgram } from "@/lib/program/actions";
import { ProgramUI } from "@/lib/program/type";

export const [ProgramsProvider, usePrograms] = createOptimisticStoreContext<ProgramUI>({
	sortFnc: (items) => items.sort((a, b) => a.order - b.order),
	add: {
		function: saveProgram,
		onSuccessMessage: "Program created successfully.",
		onErrorMessage: "Failed to create program, changes rolled back. Please try again.",
	},
});
