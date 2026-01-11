"use server";

import { cache } from "react";
import { revalidatePath } from "next/cache";

import { ROUTES } from "@/lib/consts";
import { prisma } from "@/lib/prisma";
import { formToProgram, ProgramUI } from "@/lib/program/type";
import { getUserId } from "@/lib/utils-server";

export async function getPrograms(): Promise<ProgramUI[]> {
	const userId = await getUserId();

	return prisma.program.findMany({
		where: { userId },
		select: {
			id: true,
			name: true,
			muscles: true,
			order: true,
		},
	});
}

// Cached helper: memoized by (id, userId)
const _getProgramById = cache(async (id: string, userId: string): Promise<ProgramUI | null> => {
	return prisma.program.findFirst({
		where: { id, userId },
		select: {
			id: true,
			name: true,
			muscles: true,
			order: true,
		},
	});
});

export async function getProgramById(id: string): Promise<ProgramUI | null> {
	const userId = await getUserId();
	return _getProgramById(id, userId);
}

export async function saveProgram(formData: FormData) {
	const userId = await getUserId();
	const { id, name, muscles } = formToProgram(formData);

	try {
		await prisma.program.upsert({
			where: { id },
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
		return { success: true };
	} catch (error) {
		console.error("Database error:", error);
		throw new Error("Failed to save program");
	}
}

/**
 * Updates the order of programs in the database.
 * @param sortedIds An array of program IDs in their new order.
 */
export async function updateProgramOrder(sortedIds: string[]) {
	try {
		// Perform all updates in one atomic transaction
		await prisma.$transaction(
			sortedIds.map((id, index) =>
				prisma.program.update({
					where: { id },
					data: { order: index },
				}),
			),
		);

		revalidatePath(ROUTES.PROGRAMS);
		return { success: true };
	} catch (error) {
		console.error("Database reorder failed:", error);
		// Return a structured error so the client knows to rollback
		return { success: false, error: "Database error" };
	}
}

export async function deleteProgram(id: string) {
	const userId = await getUserId();

	await prisma.program.delete({
		where: { id, userId },
	});

	revalidatePath(ROUTES.PROGRAMS);
}
