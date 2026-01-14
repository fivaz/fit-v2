import { Exercise } from "@/lib/generated/prisma/client";
import { type MuscleGroup } from "@/lib/generated/prisma/client";

export type ExerciseUI = Omit<Exercise, "userId" | "createdAt" | "updatedAt">;

export function buildEmptyExercise(): ExerciseUI {
	return {
		id: "",
		name: "",
		muscles: [],
		imageUrl: "",
	};
}

export function formToExercise(formData: FormData): ExerciseUI {
	return {
		id: (formData.get("id") as string) || "",
		name: (formData.get("name") as string) || "",
		muscles: formData.getAll("muscles") as MuscleGroup[],
		//TODO handle image upload
		imageUrl: "",
	};
}
