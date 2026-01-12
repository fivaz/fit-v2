"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeftIcon, DumbbellIcon, EditIcon, MoreVertical, Trash2 } from "lucide-react";

import { AddExerciseForm } from "@/components/exercise/add-exercise-form";
import { ProgramExerciseRow } from "@/components/exercise/program–exercise-row";
import { ProgramFormButton } from "@/components/program/program-form-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/confirm/use-confirm";
import { usePrograms } from "@/hooks/program/programs-store-context";
import { ProgramsProvider } from "@/hooks/program/programs-store-context";
import { ROUTES } from "@/lib/consts";
import { ProgramWithExercises } from "@/lib/program/type";

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
	if (!program) return null;

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
			<div className="flex w-full flex-col pb-24">
				{/* Header with back button */}
				<div className="flex items-start justify-between px-6 pt-6 pb-4">
					<div className="flex items-center gap-4">
						<Button asChild variant="ghost" size="icon">
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

					<div className="flex gap-2">
						<DropdownMenu modal={false}>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="rounded-full">
									<MoreVertical className="h-5 w-5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => setShowProgramForm(true)}>
									<EditIcon className="size-4" />
									<span>Edit Program</span>
								</DropdownMenuItem>
								<DropdownMenuItem variant="destructive" onClick={handleDelete}>
									<Trash2 className="size-4" />
									<span>Delete Program</span>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setShowAddExerciseForm(true)}>
									<DumbbellIcon className="size-4" />
									<span>Add Exercises</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>

				{program.exercises.map((exercise) => (
					<ProgramExerciseRow key={exercise.id} exercise={exercise} />
				))}

				<AddExerciseForm
					program={program}
					open={showAddExerciseForm}
					setOpen={setShowAddExerciseForm}
				/>
				<ProgramFormButton program={program} open={showProgramForm} setOpen={setShowProgramForm} />
			</div>
		</>
	);
}
