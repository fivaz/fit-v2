import { Dispatch, SetStateAction, startTransition, useEffect, useState } from "react";

import useSWRInfinite from "swr/infinite";
import { useDebounceValue } from "usehooks-ts";

import { ExerciseFilterShellProps } from "@/components/exercise/exercise-filter-shell";
import { getExercisesSearchAction } from "@/lib/exercise/actions";
import { ExerciseUI } from "@/lib/exercise/type";
import { MuscleGroupType } from "@/lib/muscle/type";

import { useExerciseMutations, useExercisesStore } from "./store";

type UseExerciseFiltersReturn = ExerciseFilterShellProps & {
	isLoading: boolean;
	fetchNextPage: () => void;
	hasNextPage: boolean;
};

export function useExerciseFilters(muscles: MuscleGroupType[]): UseExerciseFiltersReturn {
	const { setItems } = useExercisesStore();
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

	// Whenever SWR fetches, update the store
	useEffect(() => {
		if (data) {
			const flat = data.flat();
			// merge into store without overwriting local changes
			startTransition(() => setItems(flat));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return {
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
