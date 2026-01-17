import { useState } from "react";

import useSWRInfinite from "swr/infinite";
import { useDebounceValue } from "usehooks-ts";

import { ExerciseFilterShellProps } from "@/components/exercise/exercise-filter-shell";
import { getExercisesSearch } from "@/lib/exercise/actions";
import { ExerciseUI } from "@/lib/exercise/type";
import { MuscleGroupType } from "@/lib/muscle/type";

type UseExerciseFiltersReturn = ExerciseFilterShellProps & {
	filteredExercises: ExerciseUI[];
	isLoading: boolean;
	fetchNextPage: () => void;
	hasNextPage: boolean;
};

export function useExerciseFilters(muscles: MuscleGroupType[]): UseExerciseFiltersReturn {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedMuscles, setSelectedMuscles] = useState<MuscleGroupType[]>(muscles);

	const [debouncedSearchQuery] = useDebounceValue(searchQuery, 300);

	const PAGE_SIZE = 20;

	const getKey = (pageIndex: number, previousPageData: ExerciseUI[]) => {
		if (previousPageData && !previousPageData.length) return null; // reached the end
		return {
			search: debouncedSearchQuery,
			muscles: selectedMuscles,
			page: pageIndex + 1,
			PAGE_SIZE,
		};
	};

	const { data, size, setSize, isLoading, isValidating } = useSWRInfinite(
		getKey,
		getExercisesSearch,
	);

	return {
		filteredExercises: (data ? data.flat() : []) as ExerciseUI[],
		isLoading: isLoading || (isValidating && data && data.length === size) || false,
		hasNextPage: data ? data[data.length - 1].length === PAGE_SIZE : true,
		fetchNextPage: () => setSize(size + 1),
		searchQuery,
		setSearchQuery,
		selectedMuscles,
		setSelectedMuscles,
		availableMuscles: muscles,
	};
}
