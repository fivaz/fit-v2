import * as React from "react";

import { ProgramDetails } from "@/app/(dashboard)/programs/[id]/_components/program-details";
import { ProgramNotFound } from "@/app/(dashboard)/programs/[id]/_components/program-not-found";
import { getProgramByIdAction } from "@/lib/program/actions";

type ProgramPageProps = {
	params: Promise<{ id: string }>;
};

export default async function ProgramPage({ params }: ProgramPageProps) {
	const { id } = await params;

	const program = await getProgramByIdAction(id);

	if (!program) {
		return <ProgramNotFound />;
	}

	return <ProgramDetails program={program} />;
}
