"use server";
import { cache } from "react";
import { revalidatePath } from "next/cache";

import { ROUTES } from "@/lib/consts";
import { logError } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import {
	ProgramUI,
	programUISelect,
	ProgramWithExercises,
	programWithExercisesArgs,
} from "@/lib/program/type";
import { devDelay } from "@/lib/utils";
import { getUserId } from "@/lib/utils-server";

import "server-only";

/**
 * Fetches all programs for the current user.
 */
export async function getPrograms(): Promise<ProgramUI[]> {
	await devDelay();

	const userId = await getUserId();

	return prisma.program.findMany({
		where: { userId },
		...programUISelect,
	});
}

/**
 * Cached helper: memoized by (id, userId)
 */
const _getProgramById = cache(
	async (id: string, userId: string): Promise<ProgramWithExercises | null> => {
		return prisma.program.findFirst({
			where: {
				id,
				userId,
			},
			...programWithExercisesArgs,
		});
	},
);

/**
 * Public fetcher for a single program.
 */
export async function getProgramById(id: string): Promise<ProgramWithExercises | null> {
	await devDelay();

	const userId = await getUserId();
	return _getProgramById(id, userId);
}

/**
 * Saves or updates a program.
 */
export async function saveProgram({ id, name, muscles }: ProgramUI) {
	await devDelay();

	const userId = await getUserId();

	try {
		await prisma.program.upsert({
			where: { id: id || "new-id" },
			update: {
				name,
				muscles,
			},
			create: {
				name,
				muscles,
				userId,
			},
		});

		revalidatePath(ROUTES.PROGRAMS);
	} catch (error) {
		logError(error, {
			extra: { context: "error saving program", id, name, muscles, userId },
		});
		throw new Error("Failed to save program");
	}
}

/**
 * Updates the order of programs.
 */
export async function reorderPrograms(sortedIds: string[]) {
	await devDelay();

	try {
		await prisma.$transaction(
			sortedIds.map((id, index) =>
				prisma.program.update({
					where: { id },
					data: { order: index },
				}),
			),
		);

		revalidatePath(ROUTES.PROGRAMS);
	} catch (error) {
		logError(error, {
			extra: { context: "error updating program order", sortedIds },
		});
		throw new Error("Failed to update program order");
	}
}

/**
 * Deletes a program.
 */
export async function deleteProgram(id: string) {
	await devDelay();

	const userId = await getUserId();

	try {
		await prisma.program.delete({
			where: { id, userId },
		});

		revalidatePath(ROUTES.PROGRAMS);
	} catch (error) {
		logError(error, {
			extra: { context: "error deleting program", id, userId },
		});
		throw new Error("Deletion failed");
	}
}

/**
 * Updates exercises linked to a program.
 */
export async function updateProgramExercises(programId: string, exerciseIds: string[]) {
	const userId = await getUserId();

	try {
		const program = await prisma.program.findFirst({
			where: { id: programId, userId },
		});

		if (!program) throw new Error("Program not found or not owned by user");

		await prisma.$transaction([
			// Delete existing relations
			prisma.programToExercise.deleteMany({ where: { programId } }),
			// Insert new relations with order
			prisma.programToExercise.createMany({
				data: exerciseIds.map((exerciseId, index) => ({
					programId,
					exerciseId,
					order: index,
				})),
			}),
		]);

		revalidatePath(`${ROUTES.PROGRAMS}/${programId}`);
	} catch (error) {
		logError(error, {
			extra: {
				context: "error updating program exercises",
				programId,
				exerciseIds,
				userId,
			},
		});
		throw new Error("Failed to update program exercises");
	}
}
