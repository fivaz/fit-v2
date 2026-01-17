"use client";

import { createOptimisticManagerContext } from "@/hooks/optimistic-manager/create-optimistic-manager-context";
import { saveBodyMetrics } from "@/lib/body-metrics/actions";
import { BodyMetricsUI } from "@/lib/body-metrics/type";

export const [BodyMetricsProvider, useBodyMetrics] = createOptimisticManagerContext<BodyMetricsUI>({
	sortFnc: (items) => items,
	addConfig: {
		function: saveBodyMetrics,
		onSuccessMessage: "Body metric added successfully.",
		onErrorMessage: "Failed to add body metric.",
	},
});
