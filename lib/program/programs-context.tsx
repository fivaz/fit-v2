"use client";

import { createOptimisticContext } from "@/hooks/optimistic/create-optimistic-context";
import { ProgramUI } from "@/lib/program/type";

export const [ProgramsProvider, usePrograms] = createOptimisticContext<ProgramUI>((items) =>
	items.sort((a, b) => a.order - b.order),
);
