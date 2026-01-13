"use client";
import React, { useEffect, useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Filter, Loader2, Plus, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExerciseUI } from "@/lib/exercise/type";
import { MUSCLE_GROUPS } from "@/lib/muscle/type";

import ExerciseCard from "./exercise-card";

export default function ExercisesClient({ exercises }: { exercises: ExerciseUI[] }) {
	const [search, setSearch] = useState("");
	const [selectedMuscle, setSelectedMuscle] = useState(null);
	const [showAddModal, setShowAddModal] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// Simulate initial loading for design testing
	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 800);
		return () => clearTimeout(timer);
	}, []);

	// Filter Logic
	const filteredExercises = useMemo(() => {
		return exercises.filter((ex) => {
			const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
			const matchesMuscle = selectedMuscle ? ex.muscleGroupId === selectedMuscle : true;
			return matchesSearch && matchesMuscle;
		});
	}, [search, selectedMuscle, exercises]);

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			{/* Header */}
			<div className="sticky top-0 z-10 bg-gray-50/80 px-5 pb-4 backdrop-blur-lg dark:bg-gray-900/80">
				<div className="mb-4 flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Exercises</h1>
						<p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
							{exercises.length} exercises in library
						</p>
					</div>
					<Button
						onClick={() => setShowAddModal(true)}
						size="icon"
						className="h-11 w-11 rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 hover:bg-orange-600"
					>
						<Plus className="h-5 w-5" />
					</Button>
				</div>

				{/* Search */}
				<div className="relative">
					<Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
					<Input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search exercises..."
						className="rounded-xl border-gray-200 bg-white pl-10 dark:border-gray-700 dark:bg-gray-800"
					/>
				</div>

				{/* Muscle Filter */}
				<div className="scrollbar-hide -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-2">
					<Button
						variant={selectedMuscle === null ? "default" : "outline"}
						size="sm"
						onClick={() => setSelectedMuscle(null)}
						className={`shrink-0 rounded-full ${
							selectedMuscle === null
								? "bg-orange-500 text-white hover:bg-orange-600"
								: "border-gray-200 dark:border-gray-700"
						}`}
					>
						All
					</Button>
					{MUSCLE_GROUPS.map((mg) => (
						<Button
							key={mg.id}
							variant={selectedMuscle === mg.id ? "default" : "outline"}
							size="sm"
							onClick={() => setSelectedMuscle(mg.id)}
							className={`shrink-0 rounded-full ${
								selectedMuscle === mg.id
									? "bg-orange-500 text-white hover:bg-orange-600"
									: "border-gray-200 dark:border-gray-700"
							}`}
						>
							{mg.label}
						</Button>
					))}
				</div>
			</div>

			{/* Exercises Grid */}
			<div className="px-5 pb-8">
				{isLoading ? (
					<div className="flex justify-center py-20">
						<Loader2 className="h-8 w-8 animate-spin text-orange-500" />
					</div>
				) : filteredExercises.length === 0 ? (
					<div className="py-20 text-center">
						<div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
							<Search className="h-8 w-8 text-gray-400" />
						</div>
						<h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
							{search || selectedMuscle ? "No matching exercises" : "No exercises yet"}
						</h3>
						<p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
							{search || selectedMuscle
								? "Try adjusting your filters"
								: "Add your first exercise to get started"}
						</p>
						{!search && !selectedMuscle && (
							<Button
								onClick={() => setShowAddModal(true)}
								className="bg-orange-500 text-white hover:bg-orange-600"
							>
								<Plus className="mr-2 h-4 w-4" />
								Add Exercise
							</Button>
						)}
					</div>
				) : (
					<motion.div layout className="space-y-3">
						<AnimatePresence>
							{filteredExercises.map((exercise) => (
								<motion.div
									key={exercise.id}
									layout
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.9 }}
								>
									<ExerciseCard exercise={exercise} showHandle={false} />
								</motion.div>
							))}
						</AnimatePresence>
					</motion.div>
				)}
			</div>
		</div>
	);
}
