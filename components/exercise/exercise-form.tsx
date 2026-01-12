import { type FormEvent, useState } from "react";

import * as z from "zod";

import { SelectMuscles } from "@/components/select-muscles";
import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useExercises } from "@/hooks/exercise/exercises-store-context";
import { ExerciseUI, formToExercise } from "@/lib/exercise/type";

const formSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	muscles: z.array(z.string()).min(1, "Select at least one muscle group"),
});

type ExerciseFormProps = {
	exercise: ExerciseUI;
	onClose: () => void;
};

export function ExerciseForm({ exercise, onClose }: ExerciseFormProps) {
	const { addItem, updateItem } = useExercises();
	const [errors, setErrors] = useState<{ name?: string; muscles?: string }>({});
	const isEdit = !!exercise.id;

	const validateFields = (data: ExerciseUI) => {
		const result = formSchema.safeParse(data);
		if (!result.success) {
			const { fieldErrors } = z.flattenError(result.error);
			setErrors({ name: fieldErrors.name?.[0], muscles: fieldErrors.muscles?.[0] });
			return;
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const exerciseData = formToExercise(formData);

		validateFields(exerciseData);

		const optimisticExercise: ExerciseUI = {
			...exerciseData,
			id: exerciseData.id || crypto.randomUUID(),
		};

		onClose();

		if (isEdit) {
			updateItem(optimisticExercise);
		} else {
			addItem(optimisticExercise);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6 px-4">
			{isEdit && <input type="hidden" name="id" value={exercise.id} />}

			<div className="grid gap-2">
				<Label htmlFor="name">Exercise Name</Label>
				<Input
					id="name"
					name="name"
					defaultValue={exercise.name}
					placeholder="e.g. Strength Training"
					className={errors.name ? "border-destructive" : ""}
				/>
				{errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
			</div>

			<div>
				<SelectMuscles defaultValue={exercise.muscles} />
				{errors.muscles && <p className="text-destructive text-sm">{errors.muscles}</p>}
			</div>

			<DrawerFooter className="px-0">
				<Button type="submit" className="w-full">
					{isEdit ? "Save Changes" : "Create Exercise"}
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
