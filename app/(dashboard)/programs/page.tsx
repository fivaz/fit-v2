import * as React from "react";
import { Suspense } from "react";

import { ProgramsList } from "@/components/program/programs-list";
import { ProgramsSkeleton } from "@/components/program/programs-skeleton";
import { getPrograms } from "@/lib/program/actions";

export default function Programs() {
	return (
		<div className="p-4">
			<div className="mb-4 flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Workout Programs</h1>
			</div>

			<Suspense fallback={<ProgramsSkeleton />}>
				<ProgramsContent />
			</Suspense>
		</div>
	);
}

async function ProgramsContent() {
	const programs = await getPrograms();

	return <ProgramsList initialPrograms={programs} />;
}
