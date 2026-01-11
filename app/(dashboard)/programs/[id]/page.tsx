import * as React from "react";

import { ProgramDetail } from "@/components/program/program-detail";
import { ProgramNotFound } from "@/components/program/program-not-found";
import { getProgramById } from "@/lib/program/actions";
import { ProgramsProvider } from "@/lib/program/programs-context";

type ProgramPageProps = {
	params: Promise<{
		id: string;
	}>;
};

export default async function ProgramPage({ params }: ProgramPageProps) {
	const { id } = await params;

	const program = await getProgramById(id);

	if (!program) {
		return <ProgramNotFound />;
	}

	return (
		<ProgramsProvider initialItems={[program]}>
			<ProgramDetail />
		</ProgramsProvider>
	);
}
