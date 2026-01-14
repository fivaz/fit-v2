import { Prisma } from "@/lib/generated/prisma/client";

export const latestBodyMetric = {
	select: {
		id: true,
		weight: true,
		bodyFat: true,
		muscleMass: true,
		visceralFat: true,
	},
} satisfies Prisma.BodyMetricDefaultArgs;

export type BodyMetricsUI = Prisma.BodyMetricGetPayload<typeof latestBodyMetric>;

export function getEmptyBodyMetrics(): BodyMetricsUI {
	return {
		id: "",
		weight: null,
		bodyFat: null,
		muscleMass: null,
		visceralFat: null,
	};
}

export function formToBodyMetric(formData: FormData): BodyMetricsUI {
	const id = formData.get("id") as string;
	const weightRaw = formData.get("weight") as string;
	const bodyFatRaw = formData.get("bodyFat") as string;
	const muscleMassRaw = formData.get("muscleMass") as string;
	const visceralFatRaw = formData.get("visceralFat") as string;

	return {
		id,
		weight: weightRaw ? parseFloat(weightRaw) : null,
		bodyFat: bodyFatRaw ? parseFloat(bodyFatRaw) : null,
		muscleMass: muscleMassRaw ? parseFloat(muscleMassRaw) : null,
		visceralFat: visceralFatRaw ? parseInt(visceralFatRaw, 10) : null,
	};
}
