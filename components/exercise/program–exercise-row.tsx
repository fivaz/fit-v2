import * as React from "react";

import { useSortable } from "@dnd-kit/react/sortable";
import { GripVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ExerciseUI } from "@/lib/exercise/type";
import { cn } from "@/lib/utils";

type ProgramExerciseRowProps = {
	exercise: ExerciseUI;
	index: number;
};

export function ProgramExerciseRow({ exercise, index }: ProgramExerciseRowProps) {
	const { ref, handleRef, isDragging } = useSortable({
		id: exercise.id,
		index,
	});

	return (
		<Card
			ref={ref}
			className={cn(
				"group relative flex items-center py-2 transition-all",
				// Light mode
				"border-zinc-200 bg-white hover:border-orange-300 hover:bg-zinc-50",
				// Dark mode
				"dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-orange-500/40 dark:hover:bg-zinc-800",
				// Drag state
				isDragging && "z-50 scale-[1.02] shadow-lg ring-2 ring-orange-400/40",
			)}
		>
			<div className="flex w-full items-center gap-2 px-2.5 py-2">
				{/* Drag Handle — LEFT */}
				<button
					ref={handleRef}
					className={cn(
						"flex h-8 w-8 shrink-0 cursor-grab items-center justify-center rounded-md",
						"text-zinc-400 hover:bg-zinc-100 hover:text-orange-500",
						"dark:hover:bg-zinc-800",
						"active:cursor-grabbing",
					)}
					aria-label="Drag to reorder"
				>
					<GripVertical className="size-4.5" />
				</button>

				{/* Thumbnail */}
				<div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
					<img
						src={exercise.imageUrl || "/exercise.jpg"}
						alt={exercise.name}
						className="h-full w-full object-cover transition-transform group-hover:scale-105"
					/>
				</div>

				{/* Main Info */}
				<div className="flex min-w-0 flex-1 flex-col">
					<div className="flex items-center gap-2">
						<h3 className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
							{exercise.name}
						</h3>

						<Badge
							variant="outline"
							className={cn(
								"hidden h-4 px-1.5 text-[10px]",
								"border-zinc-300 text-zinc-500",
								"dark:border-zinc-700 dark:text-zinc-400",
								"group-hover:inline-flex",
							)}
						>
							{exercise.muscles.length} muscles
						</Badge>
					</div>

					<p className="truncate text-xs text-zinc-500 capitalize dark:text-zinc-400">
						{exercise.muscles.join(" • ")}
					</p>
				</div>
			</div>

			{/* Accent bar */}
			<div className="absolute top-0 left-0 h-full w-[3px] bg-orange-400 opacity-0 transition-opacity group-hover:opacity-100" />
		</Card>
	);
}
