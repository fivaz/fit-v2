import fs from "fs/promises";
import path from "path";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const exerciseSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	bodyPart: z.string().optional().nullable(),
	equipment: z.string().optional().nullable(),
	target: z.string().optional().nullable(),
	secondaryMuscles: z.array(z.string()).optional(),
	instructions: z.array(z.string()).optional(),
	description: z.string().optional().nullable(),
	difficulty: z.string().optional().nullable(),
	category: z.string().optional().nullable(),
	localPath: z.string().optional().nullable(),
});

async function seedDatabase() {
	try {
		const jsonPath = path.join(process.cwd(), "scripts", "exercises-full.json");

		const fileContent = await fs.readFile(jsonPath, "utf-8");

		const exercisesSchema = z.array(exerciseSchema);

		const exercisesData = JSON.parse(fileContent);

		const parsed = exercisesSchema.safeParse(exercisesData);

		if (!parsed.success) {
			console.error("❌ exercises-full.json validation failed:");
			console.error(z.formatError(parsed.error));
			process.exit(1);
		}

		const validExercises = parsed.data;

		// TODO validate json

		console.log(`🚀 Starting database seed for ${validExercises.length} exercises...`);

		for (const exerciseData of validExercises) {
			// Prepare the data object to avoid repetition in upsert

			// TODO use bulk
			await prisma.exercise.upsert({
				where: { id: exerciseData.id },
				update: exerciseData,
				create: {
					...exerciseData,
					id: exerciseData.id,
				},
			});

			// console.log(`✅ Synced: ${exerciseData.name}`);
		}

		console.log("\n✨ Database seeding complete!");
	} catch (error) {
		console.error("❌ Error seeding database:", error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

void seedDatabase();
