"use client";

import * as React from "react";
import { startTransition } from "react";

import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { toast } from "sonner";

import { ProgramEmptyState } from "@/components/program/program-empty-state";
import { ProgramFormButton } from "@/components/program/program-form-button";
import { ProgramsProvider, usePrograms } from "@/hooks/program/programs-store-context";
import { updateProgramOrder } from "@/lib/program/actions";
import { ProgramUI } from "@/lib/program/type";

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
	const { items: programs, setItems } = usePrograms();

	if (programs.length === 0) {
		return <ProgramEmptyState />;
	}

	return (
		<DragDropProvider
			onDragEnd={(event) => {
				// 1. Save the current state for a potential rollback
				const previousItems = [...programs];

				// 2. Optimistic Update (Immediate UI response)
				const newItems = move(programs, event);
				setItems(newItems);

				// 3. Persist to server
				startTransition(async () => {
					const result = await updateProgramOrder(newItems.map((i) => i.id));

					if (!result.success) {
						setItems(previousItems);
						toast.error("Failed to save order", {
							description: "Your list has been restored to its original order.",
						});
					}
				});
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
