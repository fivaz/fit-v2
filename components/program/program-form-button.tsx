"use client";

import * as React from "react";
import { useState } from "react";

import { NotebookTabsIcon } from "lucide-react";

import { ProgramForm } from "@/components/program/program-form";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { buildEmptyProgram, ProgramUI } from "@/lib/program/type";

type ProgramFormButtonProps = React.ComponentProps<typeof Button> & {
	program?: ProgramUI;
};

export function ProgramFormButton({
	children,
	program = buildEmptyProgram(),
	...props
}: ProgramFormButtonProps) {
	const [open, setOpen] = useState(false);

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button {...props}>
					{/* Fallback logic for children */}
					{children || (
						<>
							<NotebookTabsIcon className="mr-2 h-4 w-4" />
							New Program
						</>
					)}
				</Button>
			</DrawerTrigger>
			<DrawerContent className="max-h-[90vh]">
				<div className="mx-auto w-full max-w-md overflow-y-auto pb-6">
					<DrawerHeader>
						<DrawerTitle>{program.id ? "Edit Program" : "Create Program"}</DrawerTitle>
						{!program.id && (
							<DrawerDescription>
								Name your program and select target muscle groups.
							</DrawerDescription>
						)}
					</DrawerHeader>

					<ProgramForm program={program} onClose={() => setOpen(false)} />
				</div>
			</DrawerContent>
		</Drawer>
	);
}
