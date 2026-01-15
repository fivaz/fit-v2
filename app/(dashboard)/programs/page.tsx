import * as React from "react";

import { ProgramList } from "@/app/(dashboard)/programs/_components/program-list";
import { getPrograms } from "@/lib/program/actions";

export default async function ProgramsPage() {
	const programs = await getPrograms();

	return (
		<div className="relative">
			<div className="flex items-start justify-between pb-4">
				<div>
					<h1 className="text-foreground text-2xl font-bold">Programs</h1>
					<p className="text-muted-foreground mt-1 text-sm">{programs.length} workout programs</p>
				</div>
			</div>
			<ProgramList initialPrograms={programs} />
		</div>
	);
}
