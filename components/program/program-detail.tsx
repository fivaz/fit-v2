"use client";
import { startTransition, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
	ArrowLeftIcon,
	DumbbellIcon,
	EditIcon,
	MoreVertical,
	PlusIcon,
	Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { ProgramFormButton } from "@/components/program/program-form-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/confirm/use-confirm";
import { usePrograms } from "@/hooks/program/programs-store-context";
import { ProgramsProvider } from "@/hooks/program/programs-store-context";
import { ROUTES } from "@/lib/consts";
import { reportError } from "@/lib/logger";
import { ProgramUI } from "@/lib/program/type";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type ProgramDetailProps = {
	program: ProgramUI;
};

export function ProgramDetail({ program }: ProgramDetailProps) {
	return (
		<ProgramsProvider initialItems={[program]}>
			<ProgramDetailInternal />
		</ProgramsProvider>
	);
}

export function ProgramDetailInternal() {
	const { firstItem: program, deleteItem } = usePrograms();
	const confirm = useConfirm();
	const [showProgramForm, setShowProgramForm] = useState(false);
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
							</DropdownMenuContent>
						</DropdownMenu>

						<Button>
							<PlusIcon className="h-5 w-5" />
							<DumbbellIcon className="h-5 w-5" />
						</Button>
					</div>
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

			<ProgramFormButton
				program={program}
				open={showProgramForm}
				onOpenChange={setShowProgramForm}
			/>
		</>
	);
}
