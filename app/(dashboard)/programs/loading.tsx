import { ProgramsSkeleton } from "@/components/program/programs-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingProgramsPage() {
	return (
		<div className="px-6 pt-8">
			<div className="relative">
				<div className="flex items-start justify-between pb-2">
					<div>
						<h1 className="text-foreground text-2xl font-bold">Programs</h1>
						<div className="text-muted-foreground mt-1 flex gap-2 text-sm">
							<Skeleton className="h-6 w-10" /> workout programs
						</div>
					</div>
				</div>
				<ProgramsSkeleton />
			</div>
		</div>
	);
}
