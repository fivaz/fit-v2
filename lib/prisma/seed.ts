import { MuscleGroup } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

async function main() {
	const DEV_USER_ID = "dev-user-123";
	const DEV_ACCOUNT_ID = "dev-account-123";
	const EMAIL = "test@test.com";

	console.log("🚀 Starting seed...");

	const user = await prisma.user.upsert({
		where: { id: DEV_USER_ID },
		update: {},
		create: {
			id: "demo-user-id",
			name: "Demo User",
			email: EMAIL,
			emailVerified: true,
		},
	});

	await prisma.account.upsert({
		where: { id: DEV_ACCOUNT_ID },
		update: {},
		create: {
			id: "account-123",
			userId: user.id,
			accountId: EMAIL,
			providerId: "credential",
			password:
				"572915f247a8c5c4be56201a48bad84f:0b983fe1a6c3b51a9207c10d21e02f74606803844806e8d45f39e80ccb7b4529108cdc21b24488ae6a5ce60d61b9a2cf94294e20a50525903c0bd05aa07006ca",
			// Note: If using passwords, the hash must match Better Auth's expected format
		},
	});

	// Clean existing programs for idempotency
	await prisma.program.deleteMany({
		where: { userId: user.id },
	});

	// Seed programs
	await prisma.program.createMany({
		data: [
			{
				name: "Push Day",
				userId: user.id,
				muscles: [MuscleGroup.chest, MuscleGroup.shoulders, MuscleGroup.triceps],
			},
			{
				name: "Pull Day",
				userId: user.id,
				muscles: [MuscleGroup.back, MuscleGroup.biceps, MuscleGroup.forearms, MuscleGroup.traps],
			},
			{
				name: "Leg Day",
				userId: user.id,
				muscles: [
					MuscleGroup.quads,
					MuscleGroup.hamstrings,
					MuscleGroup.glutes,
					MuscleGroup.calves,
				],
			},
			{
				name: "Core",
				userId: user.id,
				muscles: [MuscleGroup.abs],
			},
		],
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
