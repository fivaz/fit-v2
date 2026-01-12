import { PlusIcon } from "lucide-react";

import { ExerciseList } from "@/components/exercise/exercise-list";
import { ProgramUI } from "@/lib/program/type";

import { Button } from "../ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";

type AddExerciseFormProps = {
	program: ProgramUI;
};

export function AddExerciseForm({ program }: AddExerciseFormProps) {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant="outline">
					<PlusIcon />
					Add exercises
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="relative mx-auto w-full max-w-sm">
					<DrawerHeader>
						<DrawerTitle>Add Exercises</DrawerTitle>
						<DrawerDescription>Set the exercises for this program.</DrawerDescription>
					</DrawerHeader>

					<ExerciseList program={program} initialExercises={[]} />

					<DrawerFooter>
						<Button>Add exercises</Button>
						<DrawerClose asChild>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
