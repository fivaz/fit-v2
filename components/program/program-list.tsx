"use client";

import * as React from "react";

import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";

import { ProgramEmptyState } from "@/components/program/program-empty-state";
import { ProgramFormButton } from "@/components/program/program-form-button";
import { ProgramsProvider, usePrograms } from "@/hooks/program/programs-store-context";
import { ProgramUI } from "@/lib/program/type";
import { sameOrder } from "@/lib/utils";

import { ProgramRow } from "./program-row";

type ProgramsListProps = {
	initialPrograms: ProgramUI[];
};

export function ProgramList({ initialPrograms }: ProgramsListProps) {
	return (
		<ProgramsProvider initialItems={initialPrograms}>
			<div className="">
				<div className="absolute top-0 right-0">
					<ProgramFormButton />
				</div>

				<div className="space-y-4">
					<ProgramsListInternal />
				</div>
			</div>
		</ProgramsProvider>
	);
}

export function ProgramsListInternal() {
	const { items: programs, reorderItems } = usePrograms();

	if (programs.length === 0) return <ProgramEmptyState />;

	return (
		<DragDropProvider
			onDragEnd={(event) => {
				const nextItems = move(programs, event);

				if (sameOrder(programs, nextItems)) return;

				reorderItems(nextItems);
			}}
		>
			<div className="flex flex-col gap-3">
				{programs.map((program, index) => (
					<ProgramRow key={program.id} program={program} index={index} />
				))}
			</div>
		</DragDropProvider>
	);
}
