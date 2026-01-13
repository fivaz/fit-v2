"use client";
import React, { useMemo, useState } from "react";

import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Clock, Loader2, Plus, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProgramWithExercises } from "@/lib/program/type";
import { WorkoutWithExercises } from "@/lib/workout/type";

type WorkoutDetailProps = {
	initialWorkout: WorkoutWithExercises;
};

export function WorkoutDetail({ initialWorkout }: WorkoutDetailProps) {
	// Using dummy data instead of props/loading states for design check
	const [workout] = useState<WorkoutWithExercises>(initialWorkout);
	const [exerciseSets, setExerciseSets] = useState([]);
	const [startTime] = useState(new Date());

	// Mocking mutation/loading states
	const programLoading = false;
	const isPending = false;

	if (programLoading) {
		return (
			<div className="flex items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-orange-500" />
			</div>
		);
	}

	return (
		<div>
			{/* Header */}
			<div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-5 py-4 dark:border-gray-700 dark:bg-gray-800">
				<div className="flex items-center justify-between">
					<div className="flex-1">
						<h1 className="text-lg font-bold text-gray-900 dark:text-white">
							{workout?.program?.name}
						</h1>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							{workout.exercises.length} exercises • {format(startTime, "HH:mm")}
						</p>
					</div>
					<Button className="bg-green-500 text-white hover:bg-green-600">
						{isPending ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Saving..
							</>
						) : (
							<>
								<CheckCircle className="mr-2 h-4 w-4" />
								End
							</>
						)}
					</Button>
				</div>
			</div>

			{/* Exercises */}
			<div className="space-y-6 px-5 py-6">
				{workout.exercises.map((workoutExercise, exIdx) => {
					const sets = exerciseSets[workoutExercise.exercise.id] || [];

					return (
						<motion.div
							key={workoutExercise.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: exIdx * 0.1 }}
							className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-800"
						>
							{/* Exercise Header */}
							<div className="relative h-24 overflow-hidden">
								<img
									src={workoutExercise.exercise.imageUrl || "/exercise.jpg"}
									alt={workoutExercise.exercise.name}
									className="h-full w-full object-cover"
								/>
								<div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/20" />
								<div className="absolute bottom-3 left-4">
									<h3 className="text-lg font-semibold text-white">
										{workoutExercise.exercise.name}
									</h3>
								</div>
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
								<AnimatePresence>
									{sets.map((set, setIdx) => (
										<motion.div
											key={`${workoutExercise.id}-${setIdx}`}
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											exit={{ opacity: 0, height: 0 }}
											transition={{ duration: 0.2 }}
											className="mb-2 grid grid-cols-[40px_1fr_1fr_1fr_40px] gap-2"
										>
											{/* Set Number */}
											<div className="flex items-center justify-center">
												<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-sm font-semibold text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
													{setIdx + 1}
												</div>
											</div>

											{/* Reps Input */}
											<Input
												type="number"
												placeholder="0"
												value={set.reps}
												className="h-10 border-gray-200 bg-gray-50 text-center dark:border-gray-600 dark:bg-gray-700"
											/>

											{/* Weight Input */}
											<Input
												type="number"
												placeholder="0"
												value={set.weight}
												className="h-10 border-gray-200 bg-gray-50 text-center dark:border-gray-600 dark:bg-gray-700"
											/>

											{/* Time Input */}
											<button
												className={`h-10 rounded-md border text-sm font-medium transition-colors ${
													set.time
														? "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400"
														: "border-gray-200 bg-gray-50 text-gray-400 hover:border-orange-500 dark:border-gray-600 dark:bg-gray-700"
												}`}
											>
												{set.time || <Clock className="mx-auto h-4 w-4" />}
											</button>

											{/* Delete Button */}
											<button className="flex items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20">
												<Trash2 className="h-4 w-4" />
											</button>
										</motion.div>
									))}
								</AnimatePresence>

								{/* Add Set Button */}
								<Button
									variant="outline"
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
