import { useState } from "react";
import * as React from "react";

import { Loader2 } from "lucide-react";
import useSWR from "swr";

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
import { useExercises } from "@/hooks/exercise/exercises-store-context";
import { getExercises } from "@/lib/exercise/actions";
import { ProgramWithExercises } from "@/lib/program/type";

type AddExerciseFormProps = {
	program: ProgramWithExercises;
	open?: boolean;
	setOpen?: (open: boolean) => void;
};

export function AddExerciseForm({ program, open, setOpen }: AddExerciseFormProps) {
	const {
		data: allExercises,
		isLoading,
		error,
	} = useSWR(["exercises", program.muscles], () =>
		getExercises({ muscles: { hasSome: program.muscles } }),
	);
	const { items: exercises, syncItems } = useExercises();

	const [selectedIds, setSelectedIds] = useState<string[]>(exercises.map((e) => e.id));

	const toggleExercise = (id: string) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id],
		);
	};

	const handleConfirm = async () => {
		const nextItems = allExercises?.filter((ex) => selectedIds.includes(ex.id)) || [];
		syncItems(nextItems, program.id);
	};

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			{/* Omit Trigger if controlled externally */}
			<DrawerContent className="max-h-[90vh]">
				<div className="relative mx-auto flex h-full w-full max-w-md flex-col overflow-hidden">
					<DrawerHeader>
						<DrawerTitle>Add Exercises</DrawerTitle>
						<DrawerDescription>
							Select exercises to add to <strong>{program.name}</strong>.
						</DrawerDescription>
					</DrawerHeader>

					<div className="flex-1 overflow-y-auto px-4 pb-20">
						{/* Bottom padding so items aren't hidden by footer */}
						{isLoading ? (
							<div className="flex h-40 items-center justify-center">
								<Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
							</div>
						) : error ? (
							<div className="text-destructive p-4 text-center">Failed to load exercises.</div>
						) : (
							<ExerciseSelectorList
								initialExercises={allExercises || []}
								selectedIds={selectedIds}
								onToggle={toggleExercise}
							/>
						)}
					</div>

					{/* Fixed Footer */}
					<DrawerFooter className="bg-background border-t pt-4">
						<DrawerClose asChild>
							<Button type="submit" disabled={isLoading || !!error} onClick={handleConfirm}>
								Confirm ({selectedIds.length}) exercises
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
