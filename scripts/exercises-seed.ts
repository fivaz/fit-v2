import { z } from "zod";

import { prisma } from "@/lib/prisma";

const URL = "https://pub-d03421385ad444aeb7a94fae07e5d610.r2.dev";

const SEED_URL = `${URL}/exercises/seed.json`;

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
	imageUrl: z.string().optional().nullable(),
});

type ExerciseInput = z.infer<typeof exerciseSchema>;

/**
 * 1. Fetch JSON data from CDN
 */
async function fetchExercises(): Promise<unknown> {
	console.log(`🌐 Fetching exercises from: ${SEED_URL}...`);
	const response = await fetch(SEED_URL);

	if (!response.ok) {
		throw new Error(`Failed to fetch: ${response.statusText}`);
	}

	const data = await response.json();
	console.log("📥 Data downloaded successfully.");
	return data;
}

/**
 * 2. Validate data against Zod Schema
 */
function validateExercises(data: unknown): ExerciseInput[] {
	console.log("🔍 Validating data structure...");
	const parsed = z.array(exerciseSchema).safeParse(data);

	if (!parsed.success) {
		console.error("❌ Validation failed:");
		console.error(JSON.stringify(z.formatError(parsed.error), null, 2));
		process.exit(1);
	}

	console.log("✅ Validation passed.");
	return parsed.data;
}

/**
 * 3. Bulk Insert into Database
 */
async function bulkInsert(exercises: ExerciseInput[]) {
	console.log(`🚀 Starting database seed for ${exercises.length} exercises...`);

	const result = await prisma.exercise.createMany({
		data: exercises,
		skipDuplicates: true,
	});

	console.log(`✨ Successfully seeded ${result.count} new exercises!`);
	if (result.count === 0) {
		console.log("ℹ️ No new exercises were added (they might already exist).");
	}
}

/**
 * Main Orchestrator
 */
async function seedDatabase() {
	try {
		const rawData = await fetchExercises();
		const validatedData = validateExercises(rawData);
		await bulkInsert(validatedData);

		console.log("\n🏁 Mission accomplished! Database is up to date.");
	} catch (error) {
		console.error("\n💥 Critical error during seeding:");
		console.error(error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

void seedDatabase();
