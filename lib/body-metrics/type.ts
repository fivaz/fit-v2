import { Prisma } from "@/lib/generated/prisma/client";

export const latestBodyMetric = {
	select: {
		weight: true,
		bodyFat: true,
		muscleMass: true,
		visceralFat: true,
	},
} satisfies Prisma.BodyMetricDefaultArgs;

export type BodyMetricsUI = Prisma.BodyMetricGetPayload<typeof latestBodyMetric>;

export function getEmptyBodyMetrics(): BodyMetricsUI {
	return {
		weight: 0,
		bodyFat: null,
		muscleMass: null,
		visceralFat: null,
	};
}
