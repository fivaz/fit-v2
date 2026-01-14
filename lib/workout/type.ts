import { Prisma } from "@/lib/generated/prisma/client";
import { Set } from "@/lib/generated/prisma/client";

export type SetUI = Pick<Set, "id" | "reps" | "weight" | "order"> & { time: string | null };

export const workoutWithExercisesAndSets = {
	select: {
		id: true,
		startDate: true,
		endDate: true,

		program: {
			select: {
				name: true,
				imageUrl: true,
				muscles: true,
			},
		},

		exercises: {
			orderBy: {
				order: "asc" as const,
			},
			select: {
				id: true,
				order: true,

				exercise: {
					select: {
						id: true,
						name: true,
						imageUrl: true,
						muscles: true,
					},
				},

				sets: {
					orderBy: {
						order: "asc" as const,
					},
				},
			},
		},
	},
} satisfies Prisma.WorkoutDefaultArgs;

export type WorkoutWithExercises = Prisma.WorkoutGetPayload<typeof workoutWithExercisesAndSets>;

// The Map type for your sync function
export type WorkoutSetMap = Record<string, SetUI[]>;

export function getEmptySet(order: number): SetUI {
	return {
		id: crypto.randomUUID(),
		reps: 0,
		weight: 0,
		order,
		time: null,
	};
}
