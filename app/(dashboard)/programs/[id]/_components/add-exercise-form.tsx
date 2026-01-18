import { useState } from "react";
import * as React from "react";

import { toast } from "sonner";

import { ExerciseSelectorList } from "@/app/(dashboard)/programs/[id]/_components/exercise-selector-list";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { useExerciseMutations, useExercisesStore } from "@/hooks/exercise/store";
import { ExerciseUI } from "@/lib/exercise/type";
import { updateProgramExercisesAction } from "@/lib/program/actions";
import { ProgramWithExercises } from "@/lib/program/type";

type AddExerciseFormProps = {
	program: ProgramWithExercises;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

/**
 * Renders a drawer UI that lets the user select and add exercises to a program.
 *
 * Persists the selected exercise IDs to the provided program when the Confirm button is pressed and shows a success or error toast.
 *
 * @param program - The program (with its exercises and muscles) to which selected exercises will be added
 * @param open - Whether the drawer is open
 * @param onOpenChange - Callback invoked with the new open state when the drawer is opened or closed
 * @returns A React element that displays the add-exercise drawer and selection UI
 */
export function AddExerciseForm({ program, open, onOpenChange }: AddExerciseFormProps) {
	const { items: exercises } = useExercisesStore();
	const { setItems, isPending } = useExerciseMutations();
	const [selected, setSelected] = useState<ExerciseUI[]>(exercises);

	const toggleExercise = (exercise: ExerciseUI) => {
		setSelected((prev) =>
			prev.some((e) => e.id === exercise.id)
				? prev.filter((e) => e.id !== exercise.id)
				: [...prev, exercise],
		);
	};

	const handleConfirm = () => {
		setItems(selected, {
			persist: () =>
				updateProgramExercisesAction(
					selected.map((e) => e.id),
					program.id,
				),
			onSuccess: () => toast.success("Exercises updated successfully."),
			onError: () => toast.error("Failed to update exercises."),
		});
	};

	return (
		<Drawer
			autoFocus={true}
			open={open}
			onOpenChange={onOpenChange}
			repositionInputs={false}
		>
			{/* Omit Trigger if controlled externally */}
			<DrawerContent className="h-dvh">
				<div className="relative mx-auto flex h-full w-full max-w-md flex-col overflow-hidden">
					<DrawerHeader>
						<DrawerTitle>Add Exercises</DrawerTitle>
						<DrawerDescription>
							Select exercises to add to <strong>{program.name}</strong>.
						</DrawerDescription>
					</DrawerHeader>

					<div className="flex-1 overflow-y-auto px-4 pb-4">
						<ExerciseSelectorList
							muscles={program.muscles}
							selected={selected}
							onToggle={toggleExercise}
						/>
					</div>

					{/* Fixed Footer */}
					<DrawerFooter className="bg-background border-t pt-4">
						<DrawerClose asChild>
							<Button type="submit" disabled={isPending} onClick={handleConfirm}>
								Confirm ({selected.length}) exercises
							</Button>
						</DrawerClose>
						<DrawerClose asChild>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}