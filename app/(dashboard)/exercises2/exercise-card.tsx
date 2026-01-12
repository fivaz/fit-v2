import React from "react";

import { GripVertical } from "lucide-react";

import { ExerciseUI } from "@/lib/exercise/type";

export default function ExerciseCard({
	exercise,
	showHandle = true,
}: {
	exercise: ExerciseUI;
	showHandle?: boolean;
}) {
	const defaultImage =
		"https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=400&h=300&fit=crop";

	return (
		<div
			className={`relative overflow-hidden rounded-xl shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-xl`}
		>
			{/* Background Image */}
			<div className="absolute inset-0">
				<img
					src={exercise.imageUrl || defaultImage}
					alt={exercise.name}
					className="h-full w-full object-cover"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
			</div>

			{/* Content */}
			<div className="relative flex min-h-25 items-center p-4">
				{showHandle && (
					<div className="mr-3 flex h-8 w-8 cursor-grab items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm active:cursor-grabbing">
						<GripVertical className="h-4 w-4 text-white" />
					</div>
				)}
				<div className="flex-1">
					<h4 className="text-lg font-semibold text-white">{exercise.name}</h4>
					<p className="mt-0.5 text-sm text-white/70">
						{(exercise.muscle_groups || []).join(", ")}
					</p>
				</div>
			</div>
		</div>
	);
}
