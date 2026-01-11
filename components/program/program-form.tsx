import { type FormEvent, Fragment, startTransition, useState } from "react";

import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePrograms } from "@/hooks/program/programs-store-context";
import { MUSCLE_GROUPS } from "@/lib/muscle/type";
import { saveProgram } from "@/lib/program/actions";
import { formToProgram, ProgramUI } from "@/lib/program/type";
import { cn } from "@/lib/utils";

const formSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	muscles: z.array(z.string()).min(1, "Select at least one muscle group"),
});

type ProgramFormProps = {
	program: ProgramUI;
	onClose: () => void;
};

export function ProgramForm({ program, onClose }: ProgramFormProps) {
	const { addItem, updateItem } = usePrograms();
	const [errors, setErrors] = useState<{ name?: string; muscles?: string }>({});
	const isEdit = !!program.id;
	const [selectedMuscles, setSelectedMuscles] = useState<string[]>(program.muscles || []);

	const toggleMuscle = (id: string) => {
		setSelectedMuscles((prev) =>
			prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
		);
		if (errors.muscles) setErrors((prev) => ({ ...prev, muscles: undefined }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const programData = formToProgram(formData);

		const result = formSchema.safeParse(programData);
		if (!result.success) {
			const { fieldErrors } = z.flattenError(result.error);
			setErrors({ name: fieldErrors.name?.[0], muscles: fieldErrors.muscles?.[0] });
			return;
		}

		const optimisticProgram: ProgramUI = {
			...programData,
			id: programData.id || crypto.randomUUID(),
		};

		onClose();

		if (isEdit) {
			updateItem(optimisticProgram);
		} else {
			addItem(optimisticProgram);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6 px-4">
			{isEdit && <input type="hidden" name="id" value={program.id} />}
			<div className="grid gap-2">
				<Label htmlFor="name">Program Name</Label>
				<Input
					id="name"
					name="name"
					defaultValue={program.name}
					placeholder="e.g. Strength Training"
					className={errors.name ? "border-destructive" : ""}
				/>
				{errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
			</div>
			<div className="grid gap-3">
				<Label>Target Muscle Groups</Label>
				<div className="grid grid-cols-3 gap-3">
					{MUSCLE_GROUPS.map((muscle) => {
						const isSelected = selectedMuscles.includes(muscle.id);
						return (
							<Fragment key={muscle.id}>
								{isSelected && <input type="hidden" name="muscles" value={muscle.id} />}
								<button
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
							</Fragment>
						);
					})}
				</div>
				{errors.muscles && <p className="text-destructive text-sm">{errors.muscles}</p>}
			</div>

			<DrawerFooter className="px-0">
				<Button type="submit" className="w-full">
					{isEdit ? "Save Changes" : "Create Program"}
				</Button>
				<DrawerClose asChild>
					<Button variant="outline" className="w-full">
						Cancel
					</Button>
				</DrawerClose>
			</DrawerFooter>
		</form>
	);
}
