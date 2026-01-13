import { ExerciseUI } from "@/lib/exercise/type";
import { Prisma, Program } from "@/lib/generated/prisma/client";
import { MuscleGroup } from "@/lib/generated/prisma/client";

export const programUISelect = {
	select: {
		id: true,
		name: true,
		muscles: true,
		order: true,
		imageUrl: true,
	},
} satisfies Prisma.ProgramDefaultArgs;

export type ProgramUI = Prisma.ProgramGetPayload<typeof programUISelect>;

export const programWithExercisesArgs = {
	include: {
		exercises: {
			orderBy: {
				order: "asc",
			},
			select: {
				order: true, // Keep the order from the join table
				exercise: {
					select: {
						id: true,
						name: true,
						imageUrl: true,
						muscles: true,
					},
				},
			},
		},
	},
} satisfies Prisma.ProgramDefaultArgs;

export type ProgramWithExercises = Prisma.ProgramGetPayload<typeof programWithExercisesArgs>;

export function buildEmptyProgram(): ProgramUI {
	return {
		id: "",
		name: "",
		muscles: [],
		order: 0,
		imageUrl: null,
	};
}

export function formToProgram(formData: FormData): ProgramUI {
	return {
		id: (formData.get("id") as string) || "",
		name: (formData.get("name") as string) || "",
		muscles: formData.getAll("muscles") as MuscleGroup[],
		order: 0,
		imageUrl: null,
	};
}
