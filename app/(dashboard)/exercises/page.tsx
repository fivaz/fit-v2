import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getExercises } from "@/lib/exercise/actions";

const categories = ["All", "Chest", "Back", "Shoulders", "Biceps"];

export default async function ExercisesPage() {
	const exercises = await getExercises();

	return (
		<div className="flex w-full flex-col pb-24">
			{/* Header */}
			<div className="flex items-start justify-between px-6 pt-8 pb-4">
				<div>
					<h1 className="text-foreground text-2xl font-bold">Exercises</h1>
					<p className="text-muted-foreground mt-1 text-sm">
						{exercises.length} exercises in library
					</p>
				</div>
				<Button size="icon" className="h-12 w-12 rounded-2xl">
					<Plus className="h-6 w-6" />
				</Button>
			</div>

			{/* Search */}
			<div className="mb-4 px-6">
				<div className="relative">
					<Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
					<Input type="text" placeholder="Search exercises..." className="rounded-xl pl-12" />
				</div>
			</div>

			{/* Category Filter */}
			<div className="mb-6 flex gap-3 overflow-x-auto px-6 pb-2">
				{categories.map((cat) => (
					<Button
						key={cat}
						variant={cat === "All" ? "default" : "outline"}
						className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap ${
							cat === "All" ? "" : "bg-card hover:bg-card/80"
						}`}
					>
						{cat}
					</Button>
				))}
			</div>

			{/* Exercises List */}
			<div className="flex flex-col gap-4 px-6">
				{exercises.map((exercise) => (
					<div
						key={exercise.id}
						className="group relative h-40 cursor-pointer overflow-hidden rounded-2xl"
					>
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
				))}
			</div>
		</div>
	);
}
