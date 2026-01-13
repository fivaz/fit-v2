import * as React from "react";

import { ProgramDetail } from "@/components/program/program-detail";
import { ProgramNotFound } from "@/components/program/program-not-found";
import { WorkoutDetail } from "@/components/workout/workout-detail";
import { WorkoutNotFound } from "@/components/workout/workout-not-found";
import { getProgramById } from "@/lib/program/actions";
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
