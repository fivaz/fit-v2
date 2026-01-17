"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/lib/consts";
import { ExerciseUI, exerciseUIArgs } from "@/lib/exercise/type";
import { MuscleGroup, Prisma } from "@/lib/generated/prisma/client";
import { logError } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { devDelay } from "@/lib/utils";
import { getUserId } from "@/lib/utils-server";

import "server-only";

export async function getExercisesSearchAction({
	search,
	muscles,
	page = 1,
	pageSize = 20,
}: {
	search?: string;
	muscles?: MuscleGroup[];
	page: number;
	pageSize?: number;
}) {
	const filter: Prisma.ExerciseWhereInput = {
		AND: [
			search ? { name: { contains: search, mode: "insensitive" } } : {},
			// Use hasSome to match any muscle in the array
			muscles && muscles.length > 0
				? {
						muscles: { hasSome: muscles },
					}
				: {},
		],
	};

	return getExercisesAction(filter, page, pageSize);
}

/**
 * Fetches all exercises for the current user.
 */
export async function getExercisesAction(
	filter?: Prisma.ExerciseWhereInput,
	page: number = 1,
	pageSize: number = 20,
): Promise<ExerciseUI[]> {
	await devDelay();

	const userId = await getUserId();

	// Calculate how many items to skip
	const skip = (page - 1) * pageSize;

	return prisma.exercise.findMany({
		where: {
			OR: [{ userId: userId }, { userId: null }],
			...filter,
		},
		...exerciseUIArgs,
		orderBy: {
			name: "asc" as const,
		},
		skip: skip,
		take: pageSize,
	});
}

/**
 * Public fetcher for a single exercise.
 */
export async function getExerciseByIdAction(id: string): Promise<ExerciseUI | null> {
	const userId = await getUserId();
	return prisma.exercise.findFirst({
		where: { id, userId },
		...exerciseUIArgs,
	});
}

/**
 * Saves or updates an exercise from FormData.
 */
export async function saveExerciseAction({ id, name, muscles, imageUrl }: ExerciseUI) {
	const userId = await getUserId();
	try {
		await prisma.exercise.upsert({
			where: { id: id || "new-id" },
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

		revalidatePath(ROUTES.EXERCISES);
		revalidatePath(ROUTES.PROGRAMS);
	} catch (error) {
		logError(error, {
			extra: { context: "saveExerciseAction", id, name, muscles, imageUrl, userId },
		});
		throw new Error("Failed to save exercise");
	}
}

/**
 * Deletes an exercise.
 */
export async function deleteExerciseAction(id: string) {
	const userId = await getUserId();

	try {
		await prisma.exercise.delete({
			where: { id, userId },
		});

		revalidatePath(ROUTES.EXERCISES);
		revalidatePath(ROUTES.PROGRAMS);
	} catch (error) {
		logError(error, {
			extra: { context: "deleteExerciseAction", id, userId },
		});
		throw new Error("Deletion failed");
	}
}

/**
 * Reorders exercises in a program based on the order of the array.
 */
export async function reorderProgramExercisesAction(programId: string, exerciseIds: string[]) {
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
		logError(error, {
			extra: { context: "reorderProgramExercisesAction", programId, exerciseIds },
		});
		throw new Error("Failed to reorder program exercises");
	}
}
