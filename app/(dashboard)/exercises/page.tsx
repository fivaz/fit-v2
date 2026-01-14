import * as React from "react";
import { Suspense } from "react";

import { Search } from "lucide-react";

import { ExerciseList } from "@/components/exercise/exercise-list";
import { ProgramsSkeleton } from "@/components/program/programs-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getExercises } from "@/lib/exercise/actions";

export default async function ExercisesPage() {
	return (
		<div className="px-6 pt-8">
			<div className="relative flex w-full flex-col pb-24">
				{/* Header */}
				<div className="flex items-start justify-between">
					<div>
						<h1 className="text-foreground text-2xl font-bold">Exercises</h1>
						<p className="text-muted-foreground mt-1 text-sm">{3} exercises in library</p>
					</div>
				</div>

				<Suspense fallback={<ProgramsSkeleton />}>
					<ExerciseContent />
				</Suspense>
			</div>
		</div>
	);
}

async function ExerciseContent() {
	const exercises = await getExercises();

	return <ExerciseList initialExercises={exercises} />;
}
