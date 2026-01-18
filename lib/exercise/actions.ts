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

	// --- Pagination: coerce and clamp inputs to safe integers ---
	const safePage = Number.isFinite(Number(page)) ? Math.max(1, Math.floor(Number(page))) : 1;
	const MAX_PAGE_SIZE = 100;
	const safePageSize = Number.isFinite(Number(pageSize))
		? Math.max(1, Math.min(MAX_PAGE_SIZE, Math.floor(Number(pageSize))))
		: 20;

	const skip = (safePage - 1) * safePageSize;

	// --- Build a safe `where` object: do NOT spread the incoming filter at top-level ---
	// Strip any boolean operator fields from the incoming filter to avoid callers injecting OR/AND/NOT.
	const sanitizedFilter: Prisma.ExerciseWhereInput = {};
	if (filter && typeof filter === "object") {
		for (const [key, value] of Object.entries(filter)) {
			if (key === "AND" || key === "OR" || key === "NOT") {
				// Skip boolean operators provided by callers
				continue;
			}
			// Copy allowed keys as-is (shallow copy). Deep validation can be added if needed.
			(sanitizedFilter as any)[key] = value;
		}
	}

	const where: Prisma.ExerciseWhereInput = {
		AND: [sanitizedFilter || {}, { OR: [{ userId }, { userId: null }] }],
	};

	const exercises = await prisma.exercise.findMany({
		where,
		...exerciseUIArgs,
		orderBy: {
			name: "asc",
		},
		skip,
		take: safePageSize,
	});

	return exercises.map((exercise) => ({
		...exercise,
		isPrivate: exercise.userId !== null,
	}));
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
