import { useTransition } from "react";
import { useFormStatus } from "react-dom";

import { LoaderCircleIcon, TimerIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useExercises } from "@/hooks/exercise/exercises-store-context";
import { handleStartWorkout } from "@/lib/workout/actions";

type StartWorkoutButtonProps = {
	programId: string;
	isDisabled: boolean;
};

export function StartWorkoutButton({ programId, isDisabled }: StartWorkoutButtonProps) {
	const [isSubmitting, startTransition] = useTransition();
	const { isPending } = useExercises();

	const handleStart = () => {
		startTransition(async () => {
			await handleStartWorkout(programId);
		});
	};

	return (
		<div className="fixed bottom-28 left-1/2 z-20 w-full max-w-md -translate-x-1/2 px-6">
			<form action={handleStart}>
				<Button
					size="lg"
					type="submit"
					disabled={isPending || isSubmitting || isDisabled}
					className="h-12 w-full rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 text-lg font-semibold text-white shadow-xl shadow-orange-500/40 transition-transform hover:from-orange-600 hover:to-orange-700 active:scale-[0.98]"
				>
					{isSubmitting ? (
						<LoaderCircleIcon className="size-6 animate-spin" />
					) : (
						<TimerIcon className="size-6" />
					)}
					Start Workout
				</Button>
			</form>
		</div>
	);
}
