import { Dumbbell, Info, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { ExerciseUI } from "@/lib/exercise/type";

interface ExerciseDrawerProps {
	exercise: ExerciseUI;
	open: boolean;
	setOpen?: (open: boolean) => void;
}

export function ExerciseDetails({ exercise, setOpen, open }: ExerciseDrawerProps) {
	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerContent>
				<div className="mx-auto w-full max-w-lg">
					<DrawerHeader className="text-left">
						<div className="flex items-center justify-between">
							<DrawerTitle className="flex items-center gap-2 text-2xl font-bold">
								<Dumbbell className="text-primary h-5 w-5" />
								{exercise.name}
							</DrawerTitle>
						</div>

						{/* Target Muscles Badges */}
						<div className="mt-2 flex flex-wrap gap-2">
							{exercise.muscles.map((muscle) => (
								<Badge key={muscle} variant="secondary" className="capitalize">
									{muscle.toLowerCase()}
								</Badge>
							))}
						</div>
					</DrawerHeader>

					<div className="space-y-4 p-4">
						{/* Exercise Image Placeholder/Display */}
						{(exercise.imageUrl || exercise.localPath) && (
							<div className="bg-muted aspect-video w-full overflow-hidden rounded-lg border">
								<img
									src={exercise.imageUrl || exercise.localPath || "/exercise.jpg"}
									alt={exercise.name}
									className="h-full w-full object-cover"
								/>
							</div>
						)}

						<div className="space-y-2">
							<h4 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
								How to perform
							</h4>
							<p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-line">
								{exercise.instructions || "No instruction provided for this exercise."}
							</p>
						</div>
					</div>

					<DrawerFooter className="pt-2">
						<DrawerClose asChild>
							<Button variant="outline">Close</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
