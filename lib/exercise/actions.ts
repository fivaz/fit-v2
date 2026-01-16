"use server";

import { cache } from "react";
import { revalidatePath } from "next/cache";

import { ROUTES } from "@/lib/consts";
import { ExerciseUI, exerciseUIArgs } from "@/lib/exercise/type";
import { Prisma } from "@/lib/generated/prisma/client";
import { logError } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { devDelay } from "@/lib/utils";
import { getUserId } from "@/lib/utils-server";

import "server-only";

/**
 * Fetches all exercises for the current user.
 */
export async function getExercises(filter?: Prisma.ExerciseWhereInput): Promise<ExerciseUI[]> {
	await devDelay();

	const userId = await getUserId();

	return prisma.exercise.findMany({
		where: {
			OR: [{ userId: userId }, { userId: null }],
			...filter,
		},
		...exerciseUIArgs,
		orderBy: {
			name: "asc",
		},
	});
}

/**
 * Cached helper: memoized by (id, userId)
 */
const _getExerciseById = cache(async (id: string, userId: string): Promise<ExerciseUI | null> => {
	return prisma.exercise.findFirst({
		where: { id, userId },
		...exerciseUIArgs,
	});
});

/**
 * Public fetcher for a single exercise.
 */
export async function getExerciseById(id: string): Promise<ExerciseUI | null> {
	const userId = await getUserId();
	return _getExerciseById(id, userId);
}

/**
 * Saves or updates an exercise from FormData.
 */
export async function saveExercise({ id, name, muscles, imageUrl }: ExerciseUI) {
	const userId = await getUserId();
	try {
		await prisma.exercise.upsert({
			where: { id: id || "new-id" }, // Ensure your mapper returns empty string for new items
			update: {
				name,
				muscles,
				imageUrl,
			},
			create: {
				name,
				muscles,
				imageUrl,
				userId,
			},
		});

		// Revalidate exercise list and programs (in case they display these exercises)
		revalidatePath(ROUTES.EXERCISES);
		revalidatePath(ROUTES.PROGRAMS);
	} catch (error) {
		logError(error, {
			extra: { context: "error saving exercise", id, name, muscles, imageUrl, userId },
		});
		throw new Error("Failed to save exercise");
	}
}

/**
 * Deletes an exercise.
 */
export async function deleteExercise(id: string) {
	const userId = await getUserId();

	try {
		await prisma.exercise.delete({
			where: { id, userId },
		});

		revalidatePath(ROUTES.EXERCISES);
		revalidatePath(ROUTES.PROGRAMS);
	} catch (error) {
		logError(error, {
			extra: { context: "error deleting exercise", id, userId },
		});
		throw new Error("Deletion failed");
	}
}

/**
 * Reorders exercises in a program based on the order of the array.
 * @param programId The program to update
 * @param exerciseIds Array of exercise IDs in the new order
 */
export async function reorderProgramExercises(exerciseIds: string[], programId: string) {
	try {
		await prisma.$transaction(
			exerciseIds.map((exerciseId, index) =>
				prisma.programToExercise.update({
					where: {
						programId_exerciseId: { programId, exerciseId },
					},
					data: { order: index },
				}),
			),
		);
	} catch (error) {
		console.error("Failed to reorder program exercises:", error);
		throw new Error("Failed to reorder program exercises");
	}
}
