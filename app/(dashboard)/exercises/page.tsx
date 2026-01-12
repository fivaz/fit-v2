import * as React from "react";
import { Suspense } from "react";

import { Search } from "lucide-react";

import { ExerciseList } from "@/components/exercise/exercise-list";
import { ProgramsSkeleton } from "@/components/program/programs-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getExercises } from "@/lib/exercise/actions";

const categories = ["All", "Chest", "Back", "Shoulders", "Biceps"];

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

				{/* Search */}
				<div className="mb-4">
					<div className="relative">
						<Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
						<Input type="text" placeholder="Search exercises..." className="rounded-xl pl-12" />
					</div>
				</div>

				{/* Category Filter */}
				<div className="mb-6 flex gap-3 overflow-x-auto pb-2">
					{categories.map((cat) => (
						<Button
							key={cat}
							variant={cat === "All" ? "default" : "outline"}
							className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap ${
								cat === "All" ? "" : "bg-card hover:bg-card/80"
							}`}
						>
							{cat}
						</Button>
					))}
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
