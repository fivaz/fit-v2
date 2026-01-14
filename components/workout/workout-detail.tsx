"use client";

import React, { useEffect, useRef, useState } from "react";

import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, CloudCheck, CloudUpload, Plus } from "lucide-react";
import { toast } from "sonner";
import { useDebounceValue } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { SetRow } from "@/components/workout/set-row";
import { logError } from "@/lib/logger";
import { syncWorkoutSets, WorkoutWithMappedSets } from "@/lib/workout/actions";
import { getEmptySet, WorkoutSetMap } from "@/lib/workout/type";

type WorkoutDetailProps = {
	initialWorkout: NonNullable<WorkoutWithMappedSets>;
};

export function WorkoutDetail({ initialWorkout }: WorkoutDetailProps) {
	const [exerciseSets, setExerciseSets] = useState<WorkoutSetMap>(initialWorkout.exerciseSets);

	const [debouncedSets] = useDebounceValue(exerciseSets, 1800);
	const [isSyncing, setIsSyncing] = useState(false);
	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		const syncData = async () => {
			setIsSyncing(true);
			try {
				await syncWorkoutSets(initialWorkout.id, debouncedSets);
			} catch (error) {
				logError(error, {
					extra: {
						context: "WorkoutDetail#syncData",
						initialWorkoutId: initialWorkout.id,
						debouncedSets,
					},
				});
				toast.error("Sync failed, trying again...");
			} finally {
				setIsSyncing(false);
			}
		};

		void syncData();
	}, [debouncedSets, initialWorkout.id]);

	function addSet(exerciseId: string) {
		setExerciseSets((map) => {
			const current = map[exerciseId] ?? [];
			return { ...map, [exerciseId]: [...current, getEmptySet(current.length)] };
		});
	}

	return (
		<div className="pb-20">
			{/* Header with Sync Status */}
			<div className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 px-5 py-4 backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/80">
				<div className="flex items-center justify-between">
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<h1 className="text-lg font-bold text-gray-900 dark:text-white">
								{initialWorkout.program?.name}
							</h1>
							{isSyncing ? (
								<CloudUpload className="h-4 w-4 animate-pulse text-orange-500" />
							) : (
								<CloudCheck className="h-4 w-4 text-green-500" />
							)}
						</div>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							{initialWorkout.exercises.length} exercises •{" "}
							{format(initialWorkout.startDate, "HH:mm")}
						</p>
					</div>
					<Button className="bg-green-500 text-white hover:bg-green-600">
						<CheckCircle className="mr-2 h-4 w-4" />
						Finish
					</Button>
				</div>
			</div>

			{/* Exercises List */}
			<div className="space-y-6 px-5 py-6">
				{initialWorkout.exercises.map((exercise, index) => {
					const sets = exerciseSets[exercise.id] || [];

					return (
						<motion.div
							key={exercise.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-800"
						>
							{/* Exercise Banner */}
							<div className="relative h-20 overflow-hidden">
								<img
									src={exercise.exercise.imageUrl || "/exercise.jpg"}
									alt={exercise.exercise.name}
									className="h-full w-full object-cover"
								/>
								<div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent" />
								<h3 className="absolute bottom-3 left-4 text-lg font-semibold text-white">
									{exercise.exercise.name}
								</h3>
							</div>

							{/* Sets Table */}
							<div className="p-4">
								{/* Header Row */}
								<div className="mb-2 grid grid-cols-[40px_1fr_1fr_1fr_40px] gap-2 px-2">
									<div className="text-center text-xs font-medium text-gray-500 dark:text-gray-400">
										SET
									</div>
									<div className="text-center text-xs font-medium text-gray-500 dark:text-gray-400">
										REPS
									</div>
									<div className="text-center text-xs font-medium text-gray-500 dark:text-gray-400">
										WEIGHT
									</div>
									<div className="text-center text-xs font-medium text-gray-500 dark:text-gray-400">
										TIME
									</div>
									<div></div>
								</div>

								{/* Sets */}
								<AnimatePresence mode="popLayout">
									{sets.map((set) => (
										<SetRow
											key={set.id}
											set={set}
											setExerciseSets={setExerciseSets}
											exerciseId={exercise.id}
										/>
									))}
								</AnimatePresence>

								{/* Add Set Button */}
								<Button
									variant="outline"
									onClick={() => addSet(exercise.id)}
									className="mt-2 w-full border-2 border-dashed border-gray-300 text-gray-600 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 dark:border-gray-600 dark:text-gray-400 dark:hover:border-orange-500 dark:hover:bg-orange-900/20 dark:hover:text-orange-400"
								>
									<Plus className="mr-2 h-4 w-4" />
									Add Set
								</Button>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
