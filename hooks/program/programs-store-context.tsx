"use client";

import { createOptimisticStoreContext } from "@/hooks/optimistic-store/create-optimistic-store-context";
import { ProgramUI } from "@/lib/program/type";

export const [ProgramsProvider, usePrograms] = createOptimisticStoreContext<ProgramUI>({
	sortFnc: (items) => items.sort((a, b) => a.order - b.order),
});
