"use client";

import * as React from "react";

import { XIcon } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewProgramDrawer() {
	const [open, setOpen] = React.useState(false);
	const [name, setName] = React.useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: replace with actual create logic
		console.log("Create program", name);
		setName("");
		setOpen(false);
	};

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button>New Program</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader>
						<DrawerTitle>Create Program</DrawerTitle>
						<DrawerDescription>Add a new training program to your list.</DrawerDescription>
					</DrawerHeader>

					<form onSubmit={handleSubmit} className="space-y-4 px-4">
						<div className="grid gap-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="e.g. Strength Training"
							/>
						</div>

						<DrawerFooter className="px-0">
							<Button type="submit">Create</Button>
							<DrawerClose asChild>
								<Button variant="outline">Cancel</Button>
							</DrawerClose>
						</DrawerFooter>
					</form>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
