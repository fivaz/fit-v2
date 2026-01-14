import * as React from "react";
import { Suspense } from "react";

import { ProgramList } from "@/components/program/program-list";
import { ProgramsSkeleton } from "@/components/program/programs-skeleton";
import { getPrograms } from "@/lib/program/actions";

export default function Programs() {
	return (
		<div className="relative p-4">
			<div className="relative mb-4">
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

	return <ProgramList initialPrograms={programs} />;
}
