"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBodyMetrics } from "@/hooks/body-metrics/body-metrics-store-context";
import { BodyMetricsUI, formToBodyMetric } from "@/lib/body-metrics/type";

interface MetricsFormProps {
	isOpen: boolean;
	onClose: () => void;
	bodyMetrics: BodyMetricsUI;
}

export function MetricsForm({ isOpen, onClose, bodyMetrics }: MetricsFormProps) {
	const { addItem } = useBodyMetrics();
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const bodyMetricsData = formToBodyMetric(formData);

		addItem(bodyMetricsData);
	};

	return (
		<Drawer open={isOpen} onOpenChange={(val) => !val && onClose()}>
			<DrawerContent className="px-5 pb-10">
				<DrawerHeader className="px-0">
					<DrawerTitle>Body Metrics</DrawerTitle>
					<DrawerDescription>Keep your body composition stats up to date.</DrawerDescription>
				</DrawerHeader>

				<form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 pt-4">
					<div className="col-span-1">
						<Label htmlFor="weight" className="text-xs font-semibold text-gray-400 uppercase">
							Weight (kg)
						</Label>
						<Input
							id="weight"
							name="weight"
							type="number"
							inputMode="decimal"
							step="0.1"
							defaultValue={bodyMetrics.weight ?? ""}
							className="mt-1.5 h-12 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
						/>
					</div>

					<div className="col-span-1">
						<Label htmlFor="bodyFat" className="text-xs font-semibold text-gray-400 uppercase">
							Body Fat (%)
						</Label>
						<Input
							id="bodyFat"
							name="bodyFat"
							type="number"
							inputMode="decimal"
							step="0.1"
							defaultValue={bodyMetrics.bodyFat ?? ""}
							className="mt-1.5 h-12 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
						/>
					</div>

					<div className="col-span-1">
						<Label htmlFor="muscleMass" className="text-xs font-semibold text-gray-400 uppercase">
							Muscle (%)
						</Label>
						<Input
							id="muscleMass"
							name="muscleMass"
							type="number"
							inputMode="decimal"
							step="0.1"
							defaultValue={bodyMetrics.muscleMass ?? ""}
							className="mt-1.5 h-12 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
						/>
					</div>

					<div className="col-span-1">
						<Label htmlFor="visceralFat" className="text-xs font-semibold text-gray-400 uppercase">
							Visceral Fat
						</Label>
						<Input
							id="visceralFat"
							name="visceralFat"
							type="number"
							inputMode="numeric"
							defaultValue={bodyMetrics.visceralFat ?? ""}
							className="mt-1.5 h-12 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
						/>
					</div>

					<div className="col-span-2 flex gap-3 pt-4">
						<DrawerClose asChild>
							<Button type="button" variant="outline" className="h-12 flex-1 rounded-xl">
								Cancel
							</Button>
						</DrawerClose>
						<DrawerClose asChild>
							<Button
								type="submit"
								className="h-12 flex-1 rounded-xl bg-orange-500 font-bold text-white shadow-md shadow-orange-200 dark:shadow-none"
							>
								Save Stats
							</Button>
						</DrawerClose>
					</div>
				</form>
			</DrawerContent>
		</Drawer>
	);
}
