import * as React from "react";
import Link from "next/link";

import { ArrowLeftIcon, DumbbellIcon, PlusIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/consts";
import { getProgramById } from "@/lib/program/actions";

type ProgramPageProps = {
	params: Promise<{
		id: string;
	}>;
};

export default async function ProgramPage({ params }: ProgramPageProps) {
	const { id } = await params;

	const program = await getProgramById(id);

	if (!program) {
		return (
			<div className="flex h-screen flex-col items-center justify-center gap-4">
				<p className="text-muted-foreground">Program {id} not found</p>
				<Button asChild>
					<Link href={ROUTES.PROGRAMS}>
						<ArrowLeftIcon />
						Go Back
					</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className="flex w-full flex-col pb-24">
			{/* Header with back button */}
			<div className="flex items-start justify-between px-6 pt-6 pb-4">
				<div className="flex items-center gap-4">
					<Button asChild variant="ghost" size="icon" className="rounded-full">
						<Link href={ROUTES.PROGRAMS}>
							<ArrowLeftIcon className="h-5 w-5" />
						</Link>
					</Button>
					<div>
						<h1 className="text-foreground text-2xl font-bold">{program.name}</h1>
						<div className="mt-1 flex flex-wrap gap-1">
							{program.muscles.map((muscle) => (
								<Badge
									key={muscle}
									className="bg-chart-2 h-5 border-none px-2 py-0 text-[10px] text-orange-800 capitalize hover:bg-orange-600"
								>
									{muscle}
								</Badge>
							))}
						</div>
					</div>
				</div>

				<Button size="icon" className="h-12 w-12 gap-2 rounded-2xl">
					<DumbbellIcon className="h-5 w-5" />
					<PlusIcon className="h-4 w-4" />
				</Button>
			</div>

			{/* Program background image */}
			<div className="mx-6 mb-6 h-48 overflow-hidden rounded-2xl">
				<div
					className="h-full w-full bg-cover bg-center"
					style={{
						backgroundImage: `url('/exercise.jpg')`,
					}}
				/>
			</div>
		</div>
	);
}
