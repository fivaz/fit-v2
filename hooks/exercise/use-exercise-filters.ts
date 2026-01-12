import { useMemo, useState } from "react";

import { ExerciseUI } from "@/lib/exercise/type";
import { MuscleGroup } from "@/lib/generated/prisma/enums";

export function useExerciseFilters(exercises: ExerciseUI[]) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedMuscle, setSelectedMuscle] = useState("all");

	// Logic: Extract available muscles from current items
	const availableMuscles = useMemo(() => {
		const muscleSet = new Set<string>();
		exercises.forEach((ex) => {
			ex.muscles.forEach((m) => muscleSet.add(m));
		});
		return ["all", ...Array.from(muscleSet).sort()];
	}, [exercises]);

	// Logic: Filter based on search and muscle selection
	const filteredExercises = useMemo(() => {
		return exercises.filter((ex) => {
			const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());

			const matchesMuscle =
				selectedMuscle === "all" || ex.muscles.includes(selectedMuscle as MuscleGroup);

			return matchesSearch && matchesMuscle;
		});
	}, [exercises, searchQuery, selectedMuscle]);

	return {
		searchQuery,
		setSearchQuery,
		selectedMuscle,
		setSelectedMuscle,
		availableMuscles,
		filteredExercises,
	};
}
