"use client";

import { Suspense } from "react";
import * as React from "react";

import { Search } from "lucide-react";

import { ExerciseEmptyState } from "@/components/exercise/exercise-empty-state";
import { ExerciseFormButton } from "@/components/exercise/exercise-form-button";
import { ExerciseRow } from "@/components/exercise/exercise-row";
import { ProgramsSkeleton } from "@/components/program/programs-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExercisesProvider, useExercises } from "@/hooks/exercise/exercises-store-context";
import { ExerciseUI } from "@/lib/exercise/type";
import { MuscleGroup } from "@/lib/generated/prisma/enums";
import { cn } from "@/lib/utils";

type ExercisesListProps = {
	initialExercises: ExerciseUI[];
};

export function ExerciseList({ initialExercises }: ExercisesListProps) {
	return (
		<ExercisesProvider initialItems={initialExercises}>
			<div>
				<div className="absolute top-0 right-0">
					<ExerciseFormButton />
				</div>

				<div className="space-y-4">
					<ExercisesListInternal />
				</div>
			</div>
		</ExercisesProvider>
	);
}

export function ExercisesListInternal() {
	const { items: exercises } = useExercises();

	if (exercises.length === 0) {
		return <ExerciseEmptyState />;
	}

	const muscles: string[] = ["all"];

	return (
		<>
			{/* Search */}
			<div className="mb-4">
				<div className="relative">
					<Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
					<Input type="text" placeholder="Search exercises..." className="rounded-xl pl-12" />
				</div>
			</div>

			{/* Category Filter */}
			<div className="mb-6 flex gap-3 overflow-x-auto pb-2">
				{muscles.map((cat) => (
					<Button
						key={cat}
						variant={cat === "all" ? "default" : "outline"}
						className={cn(
							"rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap capitalize",
						)}
					>
						{cat}
					</Button>
				))}
			</div>

			<div className="flex flex-col gap-4">
				{exercises.map((exercise) => (
					<ExerciseRow key={exercise.id} exercise={exercise} />
				))}
			</div>
		</>
	);
}
