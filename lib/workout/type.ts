import { ExerciseUI } from "@/lib/exercise/type";
import { Prisma, Workout, WorkoutExercise } from "@/lib/generated/prisma/client";
import { MuscleGroup } from "@/lib/generated/prisma/client";

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
