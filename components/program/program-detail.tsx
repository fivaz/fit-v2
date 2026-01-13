"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
	ArrowLeftIcon,
	DumbbellIcon,
	EditIcon,
	Loader2,
	Loader2Icon,
	LoaderCircleIcon,
	MoreVertical,
	Timer,
	TimerIcon,
	Trash2,
} from "lucide-react";

import { AddExerciseForm } from "@/components/exercise/add-exercise-form";
import { ProgramExerciseList } from "@/components/exercise/program-exercise-list";
import { MuscleBadges } from "@/components/muscle-badges";
import { ProgramFormButton } from "@/components/program/program-form-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/confirm/use-confirm";
import { ExercisesProvider } from "@/hooks/exercise/exercises-store-context";
import { usePrograms } from "@/hooks/program/programs-store-context";
import { ProgramsProvider } from "@/hooks/program/programs-store-context";
import { ROUTES } from "@/lib/consts";
import { ProgramWithExercises } from "@/lib/program/type";
import { handleStartWorkout } from "@/lib/workout/actions";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type ProgramDetailProps = {
	program: ProgramWithExercises;
};

export function ProgramDetail({ program }: ProgramDetailProps) {
	return (
		<ProgramsProvider initialItems={[program]}>
			<ProgramDetailInternal />
		</ProgramsProvider>
	);
}

export function ProgramDetailInternal() {
	const { firstItem: program, deleteItem } = usePrograms<ProgramWithExercises>();
	const confirm = useConfirm();
	const [showProgramForm, setShowProgramForm] = useState(false);
	const [showAddExerciseForm, setShowAddExerciseForm] = useState(false);
	const router = useRouter();
	const { pending } = useFormStatus();
	if (!program) return null;
	const handleStart = handleStartWorkout.bind(null, program.id);

	const handleDelete = async () => {
		const confirmed = await confirm({
			title: "Delete Program",
			message: `Are you sure you want to delete "${program.name}"? This action cannot be undone`,
		});

		if (!confirmed) return;

		deleteItem(program.id);
		router.push(ROUTES.PROGRAMS);
	};

	return (
		<>
			<div className="relative flex w-full flex-col">
				{/* Header with back button */}
				<div className="flex items-start pb-4">
					<div className="flex flex-1 items-start gap-4">
						<div>
							<h1 className="text-foreground text-2xl font-bold">{program.name}</h1>
							<MuscleBadges muscles={program.muscles} />
						</div>
					</div>

					<DropdownMenu modal={false}>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="icon">
								<MoreVertical className="size-5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => setShowAddExerciseForm(true)}>
								<DumbbellIcon className="size-4" />
								<span>Add Exercises</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setShowProgramForm(true)}>
								<EditIcon className="size-4" />
								<span>Edit Program</span>
							</DropdownMenuItem>
							<DropdownMenuItem variant="destructive" onClick={handleDelete}>
								<Trash2 className="size-4" />
								<span>Delete Program</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<ExercisesProvider initialItems={program.exercises}>
					<ProgramExerciseList programId={program.id} />
				</ExercisesProvider>

				<div className="fixed bottom-20 left-1/2 z-20 w-full max-w-md -translate-x-1/2 px-6">
					<form action={handleStart}>
						<Button
							size="lg"
							type="submit"
							disabled={pending || !program.exercises.length}
							className="h-12 w-full rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 text-lg font-semibold text-white shadow-xl shadow-orange-500/40 transition-transform hover:from-orange-600 hover:to-orange-700 active:scale-[0.98]"
						>
							{pending ? <LoaderCircleIcon className="size-6" /> : <TimerIcon className="size-6" />}
							Start Workout
						</Button>
					</form>
				</div>
			</div>

			<AddExerciseForm
				program={program}
				open={showAddExerciseForm}
				setOpen={setShowAddExerciseForm}
			/>

			<ProgramFormButton program={program} open={showProgramForm} setOpen={setShowProgramForm} />
		</>
	);
}
