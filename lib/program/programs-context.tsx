import { createOptimisticContext } from "@/hooks/create-optimistic-context";
import { Program } from "@/lib/generated/prisma/client";
import { ProgramUI } from "@/lib/program/type";

export const [ProgramsProvider, usePrograms] = createOptimisticContext<ProgramUI>();
