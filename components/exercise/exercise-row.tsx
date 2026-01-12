import { ExerciseUI } from "@/lib/exercise/type";

type ExerciseRowProps = {
	exercise: ExerciseUI;
};

export function ExerciseRow({ exercise }: ExerciseRowProps) {
	return (
		<div className="group relative h-40 cursor-pointer overflow-hidden rounded-2xl">
			<img
				src={exercise.imageUrl || "/placeholder.svg?height=160&width=400&query=exercise"}
				alt={exercise.name}
				className="h-full w-full object-cover transition-transform group-hover:scale-105"
			/>
			<div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-transparent to-transparent p-4">
				<h3 className="text-foreground text-lg font-bold">{exercise.name}</h3>
				<p className="text-foreground/70 text-sm">{exercise.muscles.join(", ")}</p>
			</div>
		</div>
	);
}
