"use client";

import * as React from "react";
import { useState } from "react";

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
import { buildEmptyProgram } from "@/lib/program/type";

export function ProgramFormButton() {
	const [open, setOpen] = useState(false);
	const program = buildEmptyProgram();

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button>New Program</Button>
			</DrawerTrigger>
			<DrawerContent className="max-h-[90vh]">
				<div className="mx-auto w-full max-w-md overflow-y-auto">
					<DrawerHeader>
						<DrawerTitle>Create Program</DrawerTitle>
						<DrawerDescription>
							Name your program and select target muscle groups.
						</DrawerDescription>
					</DrawerHeader>

					<ProgramForm program={program} onClose={() => setOpen(false)} />
				</div>
			</DrawerContent>
		</Drawer>
	);
}
