"use client";

import * as React from "react";
import Link from "next/link";

import { useSortable } from "@dnd-kit/react/sortable";
import { GripVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/lib/consts";
import { ProgramUI } from "@/lib/program/type";
import { cn } from "@/lib/utils";

type ProgramRowProps = {
	program: ProgramUI;
	index: number;
};

export function ProgramRow({ program, index }: ProgramRowProps) {
	const { ref, handleRef, isDragging } = useSortable({ id: program.id, index });

	return (
		<Card
			ref={ref}
			className={cn(
				"hover:ring-primary relative flex h-32 cursor-pointer items-end overflow-hidden rounded-2xl transition-all hover:ring-2",
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
			{/* Background image with overlay */}
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{
					backgroundImage: `url('/exercise.jpg')`,
					opacity: 0.5,
				}}
			/>
			{/* Dark overlay for text contrast */}
			<div className="from-background via-background/40 absolute inset-0 bg-linear-to-t to-transparent" />

			<Link href={`/programs/${program.id}`} className="h-full w-full">
				{/* Content */}
				<div className="relative z-10 w-full p-4">
					<h3 className="text-foreground text-lg font-semibold">{program.name}</h3>
					<div className="mt-1 flex flex-wrap gap-1">
						{program.muscles.map((muscle) => (
							<Badge
								key={muscle}
								className="bg-chart-2 h-5 border-none px-2 py-0 text-[10px] text-orange-800 capitalize hover:bg-orange-600"
							>
								{muscle}
							</Badge>
						))}
					</div>
				</div>
			</Link>
		</Card>
	);
}
