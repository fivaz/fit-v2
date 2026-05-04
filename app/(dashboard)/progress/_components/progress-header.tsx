"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

type ProgressHeaderProps = {
	onAddLog: () => void;
};

export function ProgressHeader({ onAddLog }: ProgressHeaderProps) {
	return (
		<div className="mb-6 flex items-center justify-between">
			<div>
				<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Progress</h1>
				<small className="text-red-500">(not implemented yet)</small>
				<p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
					Track your fitness journey
				</p>
			</div>
			<Button
				onClick={onAddLog}
				size="icon"
				className="h-11 w-11 rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 hover:bg-orange-600"
			>
				<Plus className="h-5 w-5" />
			</Button>
		</div>
	);
}
