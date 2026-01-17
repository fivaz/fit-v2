import { useState } from "react";

import useSWRInfinite from "swr/infinite";

import { ExerciseFilterShellProps } from "@/components/exercise/exercise-filter-shell";
import { getExercisesSearch } from "@/lib/exercise/actions";
import { ExerciseUI } from "@/lib/exercise/type";
import { MuscleGroupType } from "@/lib/muscle/type";

type UseExerciseFiltersReturn = ExerciseFilterShellProps & {
	filteredExercises: ExerciseUI[];
};

export function useExerciseFilters(muscles: MuscleGroupType[]): UseExerciseFiltersReturn {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedMuscles, setSelectedMuscles] = useState<MuscleGroupType[]>(muscles);

	const getKey = (pageIndex: number, previousPageData: ExerciseUI[]) => {
		if (previousPageData && !previousPageData.length) return null; // reached the end
		return { search: searchQuery, muscles: selectedMuscles, page: pageIndex + 1 };
	};

	const { data } = useSWRInfinite(getKey, getExercisesSearch);

	const filteredExercises: ExerciseUI[] = data ? data.flat() : [];

	return {
		searchQuery,
		setSearchQuery,
		selectedMuscles,
		setSelectedMuscles,
		availableMuscles: muscles,
		filteredExercises,
	};
}
