import { MuscleGroup } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

async function main() {
	const DEV_USER_ID = "demo-user-id";
	const DEV_ACCOUNT_ID = "account-123";
	const EMAIL = "test@test.com";

	console.log("🚀 Starting seed...");

	const user = await prisma.user.upsert({
		where: { id: DEV_USER_ID },
		update: {},
		create: {
			id: DEV_USER_ID,
			name: "Demo User",
			email: EMAIL,
			emailVerified: true,
		},
	});

	await prisma.account.upsert({
		where: { id: DEV_ACCOUNT_ID },
		update: {},
		create: {
			id: DEV_ACCOUNT_ID,
			userId: user.id,
			accountId: EMAIL,
			providerId: "credential",
			password:
				"572915f247a8c5c4be56201a48bad84f:0b983fe1a6c3b51a9207c10d21e02f74606803844806e8d45f39e80ccb7b4529108cdc21b24488ae6a5ce60d61b9a2cf94294e20a50525903c0bd05aa07006ca",
		},
	});

	await prisma.exercise.deleteMany({ where: { userId: user.id } });
	await prisma.program.deleteMany({ where: { userId: user.id } });

	console.log("🏋️ Creating Exercises...");

	const benchPress = await prisma.exercise.create({
		data: {
			name: "Bench Press",
			userId: user.id,
			muscles: [MuscleGroup.chest, MuscleGroup.triceps],
			imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
		},
	});

	const pullUps = await prisma.exercise.create({
		data: {
			name: "Pull Ups",
			userId: user.id,
			muscles: [MuscleGroup.back, MuscleGroup.biceps],
			imageUrl: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400",
		},
	});

	const squats = await prisma.exercise.create({
		data: {
			name: "Barbell Squats",
			userId: user.id,
			muscles: [MuscleGroup.quads, MuscleGroup.glutes],
			imageUrl: "https://images.unsplash.com/photo-1574673139732-1aaaecdd035d?w=400",
		},
	});

	console.log("📋 Creating Programs with associated Exercises...");

	await prisma.program.create({
		data: {
			name: "Push Day",
			userId: user.id,
			muscles: [MuscleGroup.chest, MuscleGroup.shoulders, MuscleGroup.triceps],
			exercises: {
				connect: [{ id: benchPress.id }],
			},
		},
	});

	await prisma.program.create({
		data: {
			name: "Pull Day",
			userId: user.id,
			muscles: [MuscleGroup.back, MuscleGroup.biceps, MuscleGroup.forearms],
			exercises: {
				connect: [{ id: pullUps.id }],
			},
		},
	});

	await prisma.program.create({
		data: {
			name: "Leg Day",
			userId: user.id,
			muscles: [MuscleGroup.quads, MuscleGroup.hamstrings, MuscleGroup.glutes],
			exercises: {
				connect: [{ id: squats.id }],
			},
		},
	});

	console.log("✅ Seed completed");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
