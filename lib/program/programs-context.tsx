import { createOptimisticContext } from "@/hooks/create-optimistic-context";
import { Program } from "@/lib/generated/prisma/client";

export const [ProgramsProvider, usePrograms] = createOptimisticContext<Program>();
