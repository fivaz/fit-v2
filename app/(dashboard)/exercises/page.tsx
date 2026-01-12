import * as React from "react";
import { Suspense } from "react";

import { ExerciseLibraryList } from "@/components/exercise/exercise-library-list";
import { ProgramsSkeleton } from "@/components/program/programs-skeleton";
import { getExercises } from "@/lib/exercise/actions";

export default async function ExercisesPage() {
	return (
		<div className="relative flex w-full flex-col">
			{/* Header */}
			<div className="flex items-start justify-between pb-6">
				<div>
					<h1 className="text-foreground text-2xl font-bold">Exercises</h1>
					<p className="text-muted-foreground mt-1 text-sm">{3} exercises in library</p>
				</div>
			</div>

			<Suspense fallback={<ProgramsSkeleton />}>
				<ExerciseContent />
			</Suspense>
		</div>
	);
}

async function ExerciseContent() {
	const exercises = await getExercises();

	return <ExerciseLibraryList initialExercises={exercises} />;
}
