import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { format, parse } from "date-fns";
import { motion } from "framer-motion";
import {
	Clock,
	Dumbbell,
	DumbbellIcon,
	Thermometer,
	ThermometerSun,
	ThermometerSunIcon,
	Trash2,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { useConfirm } from "@/hooks/confirm/use-confirm";
import { cn } from "@/lib/utils";
import { SetUI, WorkoutSetMap } from "@/lib/workout/type";

type SetRowProps = {
	exerciseId: string;
	set: SetUI;
	isPending: boolean;
	index: number;
	setExerciseSets: Dispatch<SetStateAction<WorkoutSetMap>>;
};

export function SetRow({ index, isPending, setExerciseSets, exerciseId, set }: SetRowProps) {
	const [editingTimeSetId, setEditingTimeSetId] = useState<string | null>(null);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const confirm = useConfirm();

	const isFirstRender = useRef(true);
	useEffect(() => {
		isFirstRender.current = false;
	}, []);

	const [showIcon, setShowIcon] = useState(false);

	// Trigger the icon show whenever isWarmup changes
	useEffect(() => {
		// We don't want this to run on the very first mount
		if (isFirstRender.current) return;

		// eslint-disable-next-line react-hooks/set-state-in-effect
		setShowIcon(true);
		const timer = setTimeout(() => setShowIcon(false), 1000);

		return () => clearTimeout(timer);
	}, [set.isWarmup]);

	async function handleRemoveSet(exerciseId: string, setId: string) {
		if (set.time || set.reps || set.weight) {
			const confirmed = await confirm({
				title: "Delete Set",
				message: "This set has data. Are you sure you want to delete it?",
			});

			if (!confirmed) return;
		}

		setExerciseSets((map) => {
			const current = map[exerciseId] ?? [];
			return { ...map, [exerciseId]: current.filter((set) => set.id !== setId) };
		});
	}

	function updateSet(
		exerciseId: string,
		setId: string,
		field: keyof SetUI,
		value: string | number,
	) {
		setExerciseSets((map) => {
			const current = map[exerciseId] ?? [];
			return {
				...map,
				[exerciseId]: current.map((set) => (set.id === setId ? { ...set, [field]: value } : set)),
			};
		});
	}

	const handleTimeInputChange = (exerciseId: string, setId: string, timeString: string) => {
		if (!timeString) return;

		const date = parse(timeString, "HH:mm", new Date());

		updateSet(exerciseId, setId, "time", date.toISOString());
	};

	function toggleWarmup() {
		setExerciseSets((map) => {
			const current = map[exerciseId] ?? [];
			return {
				...map,
				[exerciseId]: current.map((s) => (s.id === set.id ? { ...s, isWarmup: !s.isWarmup } : s)),
			};
		});
	}

	return (
		<motion.div
			key={set.id}
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, x: -20 }}
			layout
			className="mb-2 grid grid-cols-[40px_1fr_1fr_1fr_40px] gap-2"
		>
			{/* Set Number */}
			<button
				type="button"
				onClick={toggleWarmup}
				disabled={isPending}
				className="flex cursor-pointer items-center justify-center transition-transform active:scale-95"
			>
				<div
					className={cn(
						"flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold transition-all duration-300",
						set.isWarmup
							? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
							: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
					)}
				>
					{showIcon ? (
						set.isWarmup ? (
							<ThermometerSunIcon className="animate-in zoom-in size-4" />
						) : (
							<DumbbellIcon className="animate-in zoom-in size-4" />
						)
					) : (
						<span className="animate-in fade-in duration-500">{index + 1}</span>
					)}
				</div>
			</button>

			{/* Reps Input */}
			<Input
				type="number"
				inputMode="numeric"
				value={set.reps || ""}
				onChange={(e) => updateSet(exerciseId, set.id, "reps", Number(e.target.value))}
				className="h-10 border-gray-200 bg-gray-50 text-center dark:border-gray-600 dark:bg-gray-700"
			/>

			{/* Weight Input */}
			<Input
				type="number"
				inputMode="decimal"
				value={set.weight || ""}
				onChange={(e) => updateSet(exerciseId, set.id, "weight", parseFloat(e.target.value))}
				className="h-10 border-gray-200 bg-gray-50 text-center dark:border-gray-600 dark:bg-gray-700"
			/>

			{/* Time Input */}
			{editingTimeSetId === set.id ? (
				<Input
					type="time"
					autoFocus
					// date-fns format 'HH:mm' matches input type="time" requirement
					defaultValue={set.time ? format(new Date(set.time), "HH:mm") : ""}
					onBlur={() => setEditingTimeSetId(null)}
					onChange={(e) => handleTimeInputChange(exerciseId, set.id, e.target.value)}
					className="h-10 border-orange-500 bg-white p-0 text-center dark:bg-gray-800"
				/>
			) : (
				<motion.button
					type="button"
					// Handle Long Press via Pointer Events
					onPointerDown={() => {
						timerRef.current = setTimeout(() => {
							setEditingTimeSetId(set.id);
						}, 500); // 500ms for long press
					}}
					onPointerUp={() => {
						if (timerRef.current) {
							clearTimeout(timerRef.current);
							// If they released quickly and weren't editing, it's a normal tap
							if (editingTimeSetId !== set.id) {
								updateSet(exerciseId, set.id, "time", new Date().toISOString());
							}
						}
					}}
					onPointerLeave={() => {
						if (timerRef.current) clearTimeout(timerRef.current);
					}}
					className={cn(
						"h-10 rounded-md border text-sm font-medium transition-colors",
						set.time
							? "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400"
							: "border-gray-200 bg-gray-50 text-gray-400 hover:border-orange-500 dark:border-gray-600 dark:bg-gray-700",
					)}
				>
					{set.time ? format(new Date(set.time), "HH:mm") : <Clock className="mx-auto h-4 w-4" />}
				</motion.button>
			)}

			{/* Delete Button */}
			<button
				disabled={isPending}
				onClick={() => handleRemoveSet(exerciseId, set.id)}
				className="flex items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
			>
				<Trash2 className="h-4 w-4" />
			</button>
		</motion.div>
	);
}
