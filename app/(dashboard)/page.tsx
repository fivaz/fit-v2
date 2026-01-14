import { finishWorkout, redirectToActiveWorkout } from "@/lib/workout/actions";

export default async function HomePage() {
	await redirectToActiveWorkout();

	return <div>Home in progress</div>;
}
