import { Exercise } from "@/lib/generated/prisma/client";

export type ExerciseUI = Omit<Exercise, "userId" | "createdAt" | "updatedAt">;

export function buildEmptyExercise(): ExerciseUI {
	return {
		id: "",
		name: "",
		muscles: [],
		imageUrl: "",
	};
}

import { MuscleGroup } from "@/lib/generated/prisma/client";

export function formToExercise(formData: FormData): ExerciseUI {
	return {
		id: (formData.get("id") as string) || "",
		name: (formData.get("name") as string) || "",
		muscles: formData.getAll("muscles") as MuscleGroup[],
		//TODO handle image upload
		imageUrl: "",
	};
}
