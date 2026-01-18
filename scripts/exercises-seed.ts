import fs from "fs/promises";
import path from "path";

import { prisma } from "@/lib/prisma";

async function seedDatabase() {
	try {
		const jsonPath = path.join(process.cwd(), "scripts", "exercises-full.json");

		const fileContent = await fs.readFile(jsonPath, "utf-8");
		const exercisesData = JSON.parse(fileContent);

		console.log(`🚀 Starting database seed for ${exercisesData.length} exercises...`);

		for (const exerciseData of exercisesData) {
			// Prepare the data object to avoid repetition in upsert

			await prisma.exercise.upsert({
				where: { id: exerciseData.id },
				update: exerciseData,
				create: {
					id: exerciseData.id,
					...exerciseData,
				},
			});

			// console.log(`✅ Synced: ${exerciseData.name}`);
		}

		console.log("\n✨ Database seeding complete!");
	} catch (error) {
		console.error("❌ Error seeding database:", error);
	} finally {
		await prisma.$disconnect();
	}
}

void seedDatabase();
