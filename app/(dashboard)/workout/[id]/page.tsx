import * as React from "react";

import { WorkoutDetail } from "@/components/workout/workout-detail";
import { WorkoutNotFound } from "@/components/workout/workout-not-found";
import { getWorkoutById } from "@/lib/workout/actions";

type ProgramPageProps = {
	params: Promise<{ id: string }>;
};

export default async function WorkoutPage({ params }: ProgramPageProps) {
	const { id } = await params;

	const workout = await getWorkoutById(id);

	if (!workout) {
		return <WorkoutNotFound />;
	}

	return <WorkoutDetail initialWorkout={workout} />;
}
