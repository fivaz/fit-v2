import { ExerciseUI } from "@/lib/exercise/type";
import { Program } from "@/lib/generated/prisma/client";
import { MuscleGroup } from "@/lib/generated/prisma/client";
export type ProgramUI = Omit<Program, "userId" | "createdAt" | "updatedAt">;
export type ProgramWithExercises = ProgramUI & { exercises: ExerciseUI[] };

export function buildEmptyProgram(): ProgramUI {
	return {
		id: "",
		name: "",
		muscles: [],
		order: 0,
	};
}

export function formToProgram(formData: FormData): ProgramUI {
	return {
		id: (formData.get("id") as string) || "",
		name: (formData.get("name") as string) || "",
		muscles: formData.getAll("muscles") as MuscleGroup[],
		order: 0,
	};
}
