"use server";

import { revalidatePath } from "next/cache";

import { BodyMetricsUI, getEmptyBodyMetrics, latestBodyMetric } from "@/lib/body-metrics/type";
import { ROUTES } from "@/lib/consts";
import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils-server";

export async function getBodyMetrics(): Promise<BodyMetricsUI> {
	const userId = await getUserId();

	const metrics = await prisma.bodyMetric.findFirst({
		where: { userId },
		orderBy: { date: "desc" },
		...latestBodyMetric,
	});

	return metrics ?? getEmptyBodyMetrics();
}

/**
 * Upserts body metrics for a specific user.
 * Expects a partial BodyMetric object containing the measurements.
 */
export async function saveBodyMetrics(metrics: BodyMetricsUI) {
	const userId = await getUserId();
	// Normalize date to 00:00:00.000 to hit the daily unique constraint
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	await prisma.bodyMetric.upsert({
		where: {
			// This maps to the @@unique([userId, date]) in your schema
			userId_date: {
				userId,
				date: today,
			},
		},
		update: {
			weight: metrics.weight,
			bodyFat: metrics.bodyFat,
			muscleMass: metrics.muscleMass,
			visceralFat: metrics.visceralFat,
			// Prisma handles @updatedAt automatically
		},
		create: {
			userId,
			date: today,
			weight: metrics.weight,
			bodyFat: metrics.bodyFat,
			muscleMass: metrics.muscleMass,
			visceralFat: metrics.visceralFat,
		},
	});

	revalidatePath(ROUTES.SETTINGS);
}
