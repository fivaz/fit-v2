"use server";

import { BodyMetricsUI, getEmptyBodyMetrics, latestBodyMetric } from "@/lib/body-metrics/type";
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
