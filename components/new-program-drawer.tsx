"use client";

import * as React from "react";

import { CheckCircle2 } from "lucide-react";
import * as z from "zod";

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
import { cn } from "@/lib/utils";

const formSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	muscles: z.array(z.string()).min(1, "Select at least one muscle group"),
});

const MUSCLE_GROUPS = [
	{ id: "chest", label: "Chest", image: "/muscles/chest.webp" },
	{ id: "back", label: "Back", image: "/muscles/back.webp" },
	{ id: "legs", label: "Legs", image: "/muscles/legs.webp" },
	{ id: "arms", label: "Arms", image: "/muscles/arms.webp" },
	{ id: "shoulders", label: "Shoulders", image: "/muscles/shoulders.webp" },
	{ id: "core", label: "Core", image: "/muscles/core.webp" },
];

export function NewProgramDrawer() {
	const [open, setOpen] = React.useState(false);

	const [name, setName] = React.useState("");
	const [selectedMuscles, setSelectedMuscles] = React.useState<string[]>([]);
	const [errors, setErrors] = React.useState<{ name?: string; muscles?: string }>({});

	const toggleMuscle = (id: string) => {
		setSelectedMuscles((prev) =>
			prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
		);
		// Clear error when user makes a selection
		if (errors.muscles) setErrors((prev) => ({ ...prev, muscles: undefined }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const result = formSchema.safeParse({ name, muscles: selectedMuscles });

		if (!result.success) {
			const formattedErrors = result.error.flatten().fieldErrors;
			setErrors({
				name: formattedErrors.name?.[0],
				muscles: formattedErrors.muscles?.[0],
			});
			return;
		}

		console.log("Form Data:", result.data);

		setName("");
		setSelectedMuscles([]);
		setErrors({});
		setOpen(false);
	};

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

					<form onSubmit={handleSubmit} className="space-y-6 px-4">
						{/* Program Name */}
						<div className="grid gap-2">
							<Label htmlFor="name">Program Name</Label>
							<Input
								id="name"
								value={name}
								onChange={(e) => {
									setName(e.target.value);
									if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
								}}
								placeholder="e.g. Push Day"
								className={errors.name ? "border-destructive" : ""}
							/>
							{errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
						</div>

						{/* Muscle Selection */}
						<div className="grid gap-3">
							<Label>Target Muscle Groups</Label>
							<div className="grid grid-cols-3 gap-3">
								{MUSCLE_GROUPS.map((muscle) => {
									const isSelected = selectedMuscles.includes(muscle.id);
									return (
										<button
											key={muscle.id}
											type="button"
											onClick={() => toggleMuscle(muscle.id)}
											className={cn(
												"hover:bg-accent relative flex flex-col items-center gap-2 rounded-xl border-2 p-2 transition-all",
												isSelected
													? "border-orange-500 ring-2 ring-orange-500/20"
													: "bg-muted/50 border-transparent",
											)}
										>
											<div className="aspect-square w-full overflow-hidden rounded-lg bg-white">
												<img
													src={muscle.image}
													alt={muscle.label}
													className="h-full w-full object-cover"
												/>
											</div>
											<span className="text-xs font-medium">{muscle.label}</span>

											{isSelected && (
												<div className="absolute top-1 right-1">
													<CheckCircle2 className="h-4 w-4 fill-orange-500 text-white" />
												</div>
											)}
										</button>
									);
								})}
							</div>
							{errors.muscles && <p className="text-destructive text-sm">{errors.muscles}</p>}
						</div>

						<DrawerFooter className="px-0">
							<Button type="submit" className="w-full">
								Create Program
							</Button>
							<DrawerClose asChild>
								<Button variant="outline" className="w-full">
									Cancel
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</form>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
