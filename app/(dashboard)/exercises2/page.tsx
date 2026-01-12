import ExercisesClient from "@/app/(dashboard)/exercises2/exercises-client";
import { getExercises } from "@/lib/exercise/actions";

export default async function Exercises() {
	const exercises = await getExercises();

	return <ExercisesClient exercises={exercises} />;
}
