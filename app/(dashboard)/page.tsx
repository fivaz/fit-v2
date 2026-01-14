import React from "react";

import { redirectToActiveWorkout } from "@/lib/workout/actions";

export default async function HomePage() {
	await redirectToActiveWorkout();

	return (
		<div className="relative flex w-full flex-col">
			<div className="flex items-start justify-between pb-4">
				<div>
					<h1 className="text-foreground text-2xl font-bold">Home</h1>
					<small className="mt-1 text-red-500">(not implemented yet)</small>
				</div>
			</div>
		</div>
	);
}
