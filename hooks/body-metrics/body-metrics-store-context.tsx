"use client";

import { createOptimisticStoreContext } from "@/hooks/optimistic-store/create-optimistic-store-context";
import { saveBodyMetrics } from "@/lib/body-metrics/actions";
import { BodyMetricsUI } from "@/lib/body-metrics/type";

export const [BodyMetricsProvider, useBodyMetrics] = createOptimisticStoreContext<BodyMetricsUI>({
	sortFnc: (items) => items,
	addConfig: {
		function: saveBodyMetrics,
		onSuccessMessage: "Body metric added successfully.",
		onErrorMessage: "Failed to add body metric.",
	},
});
