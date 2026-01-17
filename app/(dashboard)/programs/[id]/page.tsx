import * as React from "react";

import { ProgramDetail } from "@/app/(dashboard)/programs/[id]/_components/program-detail";
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

	return <ProgramDetail program={program} />;
}
