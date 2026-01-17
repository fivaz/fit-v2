"use client";

import { createOptimisticManagerContext } from "@/hooks/optimistic-manager/create-optimistic-manager-context";
import { saveBodyMetricsAction } from "@/lib/body-metrics/actions";
import { BodyMetricsUI } from "@/lib/body-metrics/type";

export const [BodyMetricsProvider, useBodyMetrics] = createOptimisticManagerContext<BodyMetricsUI>({
	addConfig: {
		function: saveBodyMetricsAction,
		onSuccessMessage: "Body metric added successfully.",
		onErrorMessage: "Failed to add body metric.",
	},
});
