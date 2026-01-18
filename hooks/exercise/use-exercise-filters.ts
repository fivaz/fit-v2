import { useState } from "react";

import useSWRInfinite from "swr/infinite";
import { useDebounceValue } from "usehooks-ts";

import { ExerciseFilterShellProps } from "@/components/exercise/exercise-filter-shell";
import { getExercisesSearchAction } from "@/lib/exercise/actions";
import { ExerciseUI } from "@/lib/exercise/type";
import { MuscleGroupType } from "@/lib/muscle/type";

type UseExerciseFiltersReturn = ExerciseFilterShellProps & {
	isLoading: boolean;
	fetchNextPage: () => void;
	hasNextPage: boolean;
	filteredExercises: ExerciseUI[];
};

export function useExerciseFilters(muscles: MuscleGroupType[]): UseExerciseFiltersReturn {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [selectedMuscles, setSelectedMuscles] = useState<MuscleGroupType[]>(muscles);

	const [debouncedSearchQuery] = useDebounceValue(searchQuery, 300);

	const PAGE_SIZE = 20;

	const getKey = (pageIndex: number, previousPageData: ExerciseUI[]) => {
		if (previousPageData && !previousPageData.length) return null;
		return {
			search: debouncedSearchQuery,
			muscles: selectedMuscles,
			page: pageIndex + 1,
			PAGE_SIZE,
		};
	};

	const { data, size, setSize, isLoading, isValidating } = useSWRInfinite(
		getKey,
		getExercisesSearchAction,
	);

	return {
		filteredExercises: data ? data.flat() : [],
		isLoading: isLoading || (isValidating && data && data.length === size) || false,
		fetchNextPage: () => setSize(size + 1),
		hasNextPage: data ? data[data.length - 1].length === PAGE_SIZE : true,
		searchQuery,
		setSearchQuery,
		selectedMuscles,
		setSelectedMuscles,
		availableMuscles: muscles,
	};
}
