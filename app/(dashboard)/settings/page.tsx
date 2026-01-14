import * as React from "react";

import { SettingsDetail } from "@/components/settings/settings-detail";
import { getBodyMetrics } from "@/lib/body-metrics/actions";

export default async function SettingsPage() {
	const bodyMetrics = await getBodyMetrics();

	return (
		<div className="relative flex w-full flex-col">
			{/* Header */}
			<div className="flex items-start justify-between pb-4">
				<div>
					<h1 className="text-foreground text-2xl font-bold">Settings</h1>
				</div>
			</div>
			<SettingsDetail bodyMetrics={bodyMetrics} />
		</div>
	);
}
