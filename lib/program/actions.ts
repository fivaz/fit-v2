"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/lib/consts";
import { Program } from "@/lib/generated/prisma/client";
import { MuscleGroup } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { formToProgram } from "@/lib/program/type";
import { getUserId } from "@/lib/utils-server";

export async function getPrograms(): Promise<Program[]> {
	const userId = await getUserId();

	return prisma.program.findMany({
		where: { userId },
	});
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
