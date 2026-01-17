"use client";

import * as React from "react";

import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";

import { ProgramEmptyState } from "@/app/(dashboard)/programs/_components/program-empty-state";
import { ProgramRow } from "@/app/(dashboard)/programs/_components/program-row";
import { ProgramFormButton } from "@/components/program/program-form-button";
import { ProgramsProvider, usePrograms } from "@/hooks/program/programs-store-context";
import { ProgramUI } from "@/lib/program/type";
import { sameOrder } from "@/lib/utils";

type ProgramsListProps = {
	initialPrograms: ProgramUI[];
};

export function ProgramList({ initialPrograms }: ProgramsListProps) {
	return (
		<ProgramsProvider initialItems={initialPrograms}>
			<div className="absolute top-0 right-0">
				<ProgramFormButton size="icon-lg" />
			</div>

			<div className="space-y-4">
				<ProgramsListInternal />
			</div>
		</ProgramsProvider>
	);
}

export function ProgramsListInternal() {
	const { items, reorderItems } = usePrograms();

	const sortedPrograms = items.toSorted((a, b) => a.order - b.order);

	if (sortedPrograms.length === 0) return <ProgramEmptyState />;

	return (
		<DragDropProvider
			onDragEnd={(event) => {
				const nextItems = move(sortedPrograms, event);

				if (sameOrder(sortedPrograms, nextItems)) return;

				reorderItems(nextItems);
			}}
		>
			<div className="flex flex-col gap-4">
				{sortedPrograms.map((program, index) => (
					<ProgramRow key={program.id} program={program} index={index} />
				))}
			</div>
		</DragDropProvider>
	);
}
