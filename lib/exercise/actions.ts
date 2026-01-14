"use server";

import { cache } from "react";
import { revalidatePath } from "next/cache";

import { ROUTES } from "@/lib/consts";
import { ExerciseUI, formToExercise } from "@/lib/exercise/type";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils-server";

/**
 * Fetches all exercises for the current user.
 */
export async function getExercises(): Promise<ExerciseUI[]> {
	const userId = await getUserId();

	return prisma.exercise.findMany({
		where: { userId },
		select: {
			id: true,
			name: true,
			muscles: true,
			imageUrl: true,
		},
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
		select: {
			id: true,
			name: true,
			muscles: true,
			imageUrl: true,
		},
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
export async function saveExercise(formData: FormData) {
	const userId = await getUserId();
	const { id, name, muscles, imageUrl } = formToExercise(formData);

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

		return { success: true };
	} catch (error) {
		console.error("Database error:", error);
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
		return { success: true };
	} catch (error) {
		console.error("Failed to delete exercise:", error);
		throw new Error("Deletion failed");
	}
}
