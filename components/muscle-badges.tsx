import { Badge } from "@/components/ui/badge";
import { MuscleGroup } from "@/lib/generated/prisma/enums";

type MuscleBadgesProps = {
	muscles: MuscleGroup[];
};

export function MuscleBadges({ muscles }: MuscleBadgesProps) {
	return (
		<div className="mt-1 flex flex-wrap gap-1">
			{muscles.map((muscle) => (
				<Badge key={muscle} className="bg-chart-2 h-5 border-none px-2 py-0 text-[10px] capitalize">
					{muscle}
				</Badge>
			))}
		</div>
	);
}
