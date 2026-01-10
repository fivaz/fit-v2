"use client";

import { AnimatePresence } from "motion/react";

import { ProgramEmptyState } from "@/components/program/program-empty-state";
import { ProgramFormButton } from "@/components/program/program-form-button";
import { ProgramRow } from "@/components/program/program-row";
import { Program } from "@/lib/generated/prisma/client";
import { ProgramsProvider, usePrograms } from "@/lib/program/programs-context";

type ProgramsListProps = {
	initialPrograms: Program[];
};

export function ProgramsList({ initialPrograms }: ProgramsListProps) {
	return (
		<ProgramsProvider initialItems={initialPrograms}>
			<div className="space-y-4">
				<ProgramFormButton />
				<ProgramsListInternal />
			</div>
		</ProgramsProvider>
	);
}

function ProgramsListInternal() {
	const { items: programs } = usePrograms();

	if (programs.length === 0) {
		return <ProgramEmptyState />;
	}

	return (
		<div className="space-y-2">
			<AnimatePresence mode="popLayout">
				{programs.map((program) => (
					<ProgramRow key={program.id} program={program} />
				))}
			</AnimatePresence>
		</div>
	);
}
