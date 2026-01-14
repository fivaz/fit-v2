"use client";

import * as React from "react";

import { useSortable } from "@dnd-kit/react/sortable";
import { GripVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ProgramUI } from "@/lib/program/type";
import { cn } from "@/lib/utils";

type ProgramRowProps = {
	program: ProgramUI;
	index: number;
};

export function ProgramRow({ program, index }: ProgramRowProps) {
	const { ref, handleRef, isDragging } = useSortable({ id: program.id, index });

	return (
		<div
			ref={ref}
			className={cn(
				"group bg-card flex items-center gap-4 rounded-xl border p-4 shadow-sm transition-all",
				isDragging ? "z-50 border-orange-500 bg-orange-50/50 shadow-lg" : "hover:border-orange-200",
			)}
		>
			<button
				ref={handleRef}
				className="text-muted-foreground cursor-grab p-1 hover:text-orange-600 active:cursor-grabbing"
				aria-label="Drag to reorder"
			>
				<GripVertical className="size-5" />
			</button>

			<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-2xl">
				🏋️
			</div>

			<div className="flex flex-col gap-1 overflow-hidden">
				<h3 className="text-sm leading-none font-semibold">{program.name}</h3>

				<div className="mt-1 flex flex-wrap gap-1">
					{program.muscles.map((muscle) => (
						<Badge
							key={muscle}
							className="h-5 border-none bg-orange-300 px-2 py-0 text-[10px] text-orange-800 capitalize hover:bg-orange-600"
						>
							{muscle}
						</Badge>
					))}
				</div>
			</div>
		</div>
	);
}
