"use client";

import { useEffect } from "react";

import { useIntersectionObserver } from "usehooks-ts";

import { ExerciseRow } from "@/app/(dashboard)/exercises/_components/exercise-row";
import { ExerciseEmptyState } from "@/components/exercise/exercise-empty-state";
import { ExerciseFilterShell, NoResultsFound } from "@/components/exercise/exercise-filter-shell";
import { ExerciseFormButton } from "@/components/exercise/exercise-form-button";
import { ExercisesProvider, useExercisesStore } from "@/hooks/exercise/store";
import { useExerciseFilters } from "@/hooks/exercise/use-exercise-filters";
import { ExerciseUI } from "@/lib/exercise/type";
import { ALL_MUSCLES } from "@/lib/muscle/type";

type ExerciseLibraryListProps = {
	initialExercises: ExerciseUI[];
};

export function ExerciseLibraryList({ initialExercises }: ExerciseLibraryListProps) {
	return (
		<ExercisesProvider initialItems={initialExercises}>
			<div className="absolute top-0 right-0">
				<ExerciseFormButton size="icon-lg" />
			</div>

			<div className="space-y-4">
				<LibraryInternal />
			</div>
		</ExercisesProvider>
	);
}

function LibraryInternal() {
	const filterData = useExerciseFilters(ALL_MUSCLES);
	const { isLoading, hasNextPage, fetchNextPage } = filterData;
	const { items: filteredExercises } = useExercisesStore();

	const { isIntersecting, ref: bottomRef } = useIntersectionObserver({ threshold: 0.1 });

	useEffect(() => {
		if (isIntersecting && hasNextPage && !isLoading) {
			fetchNextPage();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isIntersecting, hasNextPage, isLoading]);

	if (!isLoading && filteredExercises.length === 0) return <ExerciseEmptyState />;

	const sortedExercises = filteredExercises.toSorted((a, b) => a.name.localeCompare(b.name));

	return (
		<>
			{/* Reusable Filter UI */}
			<ExerciseFilterShell {...filterData} />

			{/* Management Results Section */}
			<div className="flex flex-col gap-4">
				{sortedExercises.length > 0
					? sortedExercises.map((exercise) => <ExerciseRow key={exercise.id} exercise={exercise} />)
					: !isLoading && <NoResultsFound />}
			</div>
			<div ref={bottomRef} className="flex h-20 items-center justify-center">
				{isLoading && (
					<p className="text-muted-foreground animate-pulse text-sm">Loading more exercises...</p>
				)}
				{sortedExercises.length > 0 && (
					<p className="text-muted-foreground text-sm italic">End of list.</p>
				)}
			</div>
		</>
	);
}
