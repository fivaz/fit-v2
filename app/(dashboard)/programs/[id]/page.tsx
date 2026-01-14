import * as React from "react";

import { ProgramDetail } from "@/components/program/program-detail";
import { ProgramNotFound } from "@/components/program/program-not-found";
import { getProgramById } from "@/lib/program/actions";

type ProgramPageProps = {
	params: Promise<{ id: string }>;
};

export default async function ProgramPage({ params }: ProgramPageProps) {
	const { id } = await params;

	const program = await getProgramById(id);

	if (!program) {
		return <ProgramNotFound />;
	}

	return <ProgramDetail program={program} />;
}
