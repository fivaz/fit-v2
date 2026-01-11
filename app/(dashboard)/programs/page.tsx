import * as React from "react";
import { Suspense } from "react";

import { Plus } from "lucide-react";

import { ProgramList } from "@/components/program/program-list";
import { ProgramsSkeleton } from "@/components/program/programs-skeleton";
import { Button } from "@/components/ui/button";
import { getPrograms } from "@/lib/program/actions";

export default function ProgramPage() {
	return (
		<div className="px-6 pt-8">
			<div className="relative">
				<div className="flex items-start justify-between pb-2">
					<div>
						<h1 className="text-foreground text-2xl font-bold">Programs</h1>
						<p className="text-muted-foreground mt-1 text-sm">{4} workout programs</p>
					</div>
				</div>

				<Suspense fallback={<ProgramsSkeleton />}>
					<ProgramsContent />
				</Suspense>
			</div>
		</div>
	);
}

async function ProgramsContent() {
	const programs = await getPrograms();

	return <ProgramList initialPrograms={programs} />;
}
