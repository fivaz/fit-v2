import * as React from "react";

import { useSortable } from "@dnd-kit/react/sortable";
import { GripVertical } from "lucide-react";

import { ExerciseUI } from "@/lib/exercise/type";
import { cn } from "@/lib/utils";

type ProgramExerciseRowProps = {
	exercise: ExerciseUI;
	index: number;
};

export function ProgramExerciseRow({ exercise, index }: ProgramExerciseRowProps) {
	const { ref, handleRef, isDragging } = useSortable({ id: exercise.id, index });

	return (
		<div
			ref={ref}
			className={cn(
				"group relative flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-3 transition-all active:scale-[0.98]",
				"bg-muted/40 hover:bg-muted border-transparent",
				isDragging ? "z-50 border-orange-500 bg-orange-50/50 shadow-lg" : "hover:border-orange-200",
			)}
		>
			{/* Handle for drag and drop */}
			<button
				ref={handleRef}
				className="absolute top-0 left-0 z-20 cursor-grab p-3 hover:text-orange-600 active:cursor-grabbing"
				aria-label="Drag to reorder"
			>
				<GripVertical className="size-5" />
			</button>

			<div className="flex items-center gap-3">
				{/* Thumbnail: Smaller and rounded */}
				<div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border">
					<img
						src={exercise.imageUrl || "/exercise.jpg"}
						alt={exercise.name}
						className="h-full w-full object-cover"
					/>
				</div>

				{/* Text content: Stacked vertically */}
				<div className="flex flex-col">
					<h3 className={cn("mb-1 text-sm leading-none font-semibold", "text-foreground")}>
						{exercise.name}
					</h3>
					<p className="text-muted-foreground text-xs capitalize">{exercise.muscles.join(", ")}</p>
				</div>
			</div>
		</div>
	);
}
