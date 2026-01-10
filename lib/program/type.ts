import { Program } from "@/lib/generated/prisma/client";

export type ProgramUI = Omit<Program, "userId" | "createdAt" | "updatedAt">;

export function buildEmptyProgram(): ProgramUI {
	return {
		id: "",
		name: "",
		muscles: [],
	};
}

import { MuscleGroup } from "@/lib/generated/prisma/client";

export function formToProgram(formData: FormData): ProgramUI {
	return {
		id: (formData.get("id") as string) || "",
		name: (formData.get("name") as string) || "",
		muscles: formData.getAll("muscles") as MuscleGroup[],
	};
}
