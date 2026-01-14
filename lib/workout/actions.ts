"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { ROUTES } from "@/lib/consts";
import { logError } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils-server";
import { WorkoutSetMap, workoutWithExercisesAndSets } from "@/lib/workout/type";

export async function syncWorkoutSets(workoutId: string, exerciseSetsMap: WorkoutSetMap) {
	// 1. Flatten the map into an array compatible with createMany
	const allSets = Object.entries(exerciseSetsMap).flatMap(([workoutExerciseId, sets]) =>
		sets.map((set, index) => ({
			id: set.id, // Using the client-generated UUID
			reps: set.reps,
			weight: set.weight,
			order: index,
			workoutExerciseId,
		})),
	);

	await prisma.$transaction(async (tx) => {
		// 2. Wipe all existing sets for this workout
		await tx.set.deleteMany({
			where: { workoutExercise: { workoutId: workoutId } },
		});

		// 3. Bulk insert everything from the client
		if (allSets.length > 0) {
			await tx.set.createMany({ data: allSets });
		}
	});

	revalidatePath(`${ROUTES.WORKOUT}/${workoutId}`);

	return exerciseSetsMap;
}

/**
 * Fetches a complete workout session including the program details,
 * all exercises performed, and the individual sets for each exercise.
 */
export async function getWorkoutById(id: string) {
	const userId = await getUserId();

	const workout = await prisma.workout.findUnique({
		where: { id, userId },
		...workoutWithExercisesAndSets,
	});

	if (!workout) return null;

	const exerciseSets: WorkoutSetMap = {};

	workout.exercises.forEach((workoutExercise) => {
		exerciseSets[workoutExercise.id] = workoutExercise.sets.map((set) => ({
			...set,
			time: set.time ? set.time.toISOString() : null,
		}));
	});
	return {
		...workout,
		exerciseSets,
	};
}

export type WorkoutWithMappedSets = Awaited<ReturnType<typeof getWorkoutById>>;

export async function handleStartWorkout(programId: string) {
	const userId = await getUserId();

	const workoutId = await startWorkout(userId, programId);

	redirect(`${ROUTES.WORKOUT}/${workoutId}`);
}

/**
 * Creates a new workout session based on a program.
 * Pre-fills sets based on previous history or defaults.
 */
export async function startWorkout(userId: string, programId: string) {
	// 1. Fetch the Program with its ordered exercises
	const program = await prisma.program.findUnique({
		where: { id: programId },
		include: {
			exercises: {
				orderBy: { order: "asc" },
				include: { exercise: true }, // We need the exercise details
			},
		},
	});

	if (!program) throw new Error("Program not found");

	// 2. Fetch the LAST workout for this specific program + user
	// We need this to copy the weights/reps
	const lastWorkout = await prisma.workout.findFirst({
		where: {
			userId,
			programId,
			endDate: { not: null }, // Only consider finished workouts
		},
		orderBy: { startDate: "desc" },
		include: {
			exercises: {
				include: {
					sets: {
						orderBy: { order: "asc" },
					},
				},
			},
		},
	});

	// Helper to find previous data for a specific exercise ID
	const getPreviousStats = (exerciseId: string) => {
		if (!lastWorkout) return null;
		return lastWorkout.exercises.find((e) => e.exerciseId === exerciseId);
	};

	// 3. Create the new Workout with pre-filled data in a Transaction
	const newWorkout = await prisma.$transaction(async (tx) => {
		return tx.workout.create({
			data: {
				userId,
				programId,
				startDate: new Date(), // User requested startDate
				// endDate remains null until they finish

				// Create the WorkoutExercises and Sets simultaneously
				exercises: {
					create: program.exercises.map((programExercise) => {
						const previousData = getPreviousStats(programExercise.exerciseId);

						// LOGIC: Define the sets to create
						let setsToCreate = [];

						if (previousData && previousData.sets.length > 0) {
							// CASE A: Copy from previous workout
							setsToCreate = previousData.sets.map((prevSet, index) => ({
								order: index,
								reps: prevSet.reps,
								weight: prevSet.weight,
								time: null, // Reset time as it hasn't happened yet
								isWarmup: prevSet.isWarmup,
							}));
						} else {
							// CASE B: Default to 3 empty sets
							setsToCreate = [
								{ order: 0, reps: 0, weight: null, time: null },
								{ order: 1, reps: 0, weight: null, time: null },
								{ order: 2, reps: 0, weight: null, time: null },
							];
						}

						return {
							exerciseId: programExercise.exerciseId,
							order: programExercise.order,
							sets: {
								create: setsToCreate,
							},
						};
					}),
				},
			},
		});
	});

	return newWorkout.id;
}

export async function finishWorkout(workoutId: string) {
	try {
		await prisma.workout.update({
			where: { id: workoutId },
			data: {
				endDate: new Date(),
				// You could also calculate total volume here if you have a field for it
			},
		});
	} catch (error) {
		logError(error, { extra: { context: "finishWorkout", workoutId } });
		throw new Error("Could not complete workout");
	}

	// Clear cache and move the user
	revalidatePath(ROUTES.PROGRESS);
	redirect(ROUTES.PROGRESS);
}
