import { useMemo, useState } from "react";

import useSWRInfinite from "swr/infinite";

import { ExerciseFilterShellProps } from "@/components/exercise/exercise-filter-shell";
import { getExercises, getExercisesSearch } from "@/lib/exercise/actions";
import { ExerciseUI } from "@/lib/exercise/type";
import { MuscleGroup } from "@/lib/generated/prisma/enums";
import { MuscleGroupType, SearchableMuscle } from "@/lib/muscle/type";

type UseExerciseFiltersReturn = ExerciseFilterShellProps & {
	filteredExercises: ExerciseUI[];
};

export function useExerciseFilters(muscles: SearchableMuscle[]): UseExerciseFiltersReturn {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedMuscles, setSelectedMuscles] = useState<SearchableMuscle[]>(muscles);

	const getKey = (pageIndex: number, previousPageData: ExerciseUI[]) => {
		console.log("xx", searchQuery);
		if (previousPageData && !previousPageData.length) return null; // reached the end
		return { search: searchQuery, muscles: selectedMuscles, page: pageIndex + 1 };
	};

	const { data } = useSWRInfinite(getKey, getExercisesSearch);

	const filteredExercises: ExerciseUI[] = data ? data.flat() : [];

	console.log(data);

	return {
		searchQuery,
		setSearchQuery,
		selectedMuscles,
		setSelectedMuscles,
		availableMuscles: muscles,
		filteredExercises,
	};
}
