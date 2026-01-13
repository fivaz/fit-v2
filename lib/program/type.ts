import { ExerciseUI } from "@/lib/exercise/type";
import { Prisma, Program } from "@/lib/generated/prisma/client";
import { MuscleGroup } from "@/lib/generated/prisma/client";

export const programUISelect = {
	select: {
		id: true,
		name: true,
		muscles: true,
		imageUrl: true,
		order: true,
	},
} satisfies Prisma.ProgramDefaultArgs;

export type ProgramUI = Prisma.ProgramGetPayload<typeof programUISelect>;

export const programWithExercisesArgs = {
	select: {
		id: true,
		name: true,
		imageUrl: true,
		muscles: true,
		order: true,

		exercises: {
			orderBy: {
				order: "asc" as const,
			},
			select: {
				order: true,
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

type ProgramRaw = Prisma.ProgramGetPayload<typeof programWithExercisesArgs>;

// The Flattened type for UI
export type ProgramWithExercises = Omit<ProgramRaw, "exercises"> & {
	exercises: ProgramRaw["exercises"][number]["exercise"][];
};

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
