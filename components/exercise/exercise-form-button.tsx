"use client";

import * as React from "react";
import { useState } from "react";

import { PlusIcon } from "lucide-react";

import { ExerciseForm } from "@/components/exercise/exercise-form";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { buildEmptyExercise, ExerciseUI } from "@/lib/exercise/type";

type ExerciseFormButtonProps = React.ComponentProps<typeof Button> & {
	exercise?: ExerciseUI;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

export function ExerciseFormButton({
	children,
	exercise = buildEmptyExercise(),
	open: externalOpen,
	onOpenChange: externalOnOpenChange,
	...props
}: ExerciseFormButtonProps) {
	// Internal state management if external state isn't provided
	const [internalOpen, setInternalOpen] = useState(false);

	// Determine which state to use
	const isControlled = externalOpen !== undefined;
	const open = isControlled ? externalOpen : internalOpen;
	const setOpen = isControlled ? externalOnOpenChange : setInternalOpen;

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			{/* Omit Trigger if controlled externally */}
			{!isControlled && (
				<DrawerTrigger asChild>
					<Button {...props}>
						{children || (
							<>
								<PlusIcon size="icon" className="size-5" />
							</>
						)}
					</Button>
				</DrawerTrigger>
			)}

			<DrawerContent className="max-h-[90vh]">
				<div className="mx-auto w-full max-w-md overflow-y-auto pb-6">
					<DrawerHeader>
						<DrawerTitle>{exercise.id ? "Edit Exercise" : "Create Exercise"}</DrawerTitle>
					</DrawerHeader>

					<ExerciseForm exercise={exercise} onClose={() => setOpen?.(false)} />
				</div>
			</DrawerContent>
		</Drawer>
	);
}
