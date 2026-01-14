"use client";

import React, { useEffect, useState } from "react";

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

export function MetricsForm({ isOpen, onClose, initialData, onSave }: any) {
	const [formData, setFormData] = useState(initialData);

	useEffect(() => {
		if (isOpen) setFormData(initialData);
	}, [initialData, isOpen]);

	return (
		<Drawer open={isOpen} onOpenChange={(val) => !val && onClose()}>
			<DrawerContent className="px-5 pb-10">
				<DrawerHeader className="px-0">
					<DrawerTitle>Body Metrics</DrawerTitle>
					<DrawerDescription>Keep your body composition stats up to date.</DrawerDescription>
				</DrawerHeader>

				<div className="grid grid-cols-2 gap-4 pt-4">
					<div className="col-span-1">
						<Label className="text-xs font-semibold text-gray-400 uppercase">Weight (kg)</Label>
						<Input
							type="number"
							inputMode="decimal"
							value={formData.weight}
							onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
							className="mt-1.5 h-12 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
						/>
					</div>
					<div className="col-span-1">
						<Label className="text-xs font-semibold text-gray-400 uppercase">Body Fat (%)</Label>
						<Input
							type="number"
							inputMode="decimal"
							value={formData.bodyFat}
							onChange={(e) => setFormData({ ...formData, bodyFat: e.target.value })}
							className="mt-1.5 h-12 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
						/>
					</div>
					<div className="col-span-1">
						<Label className="text-xs font-semibold text-gray-400 uppercase">Muscle (%)</Label>
						<Input
							type="number"
							inputMode="decimal"
							value={formData.muscleMass}
							onChange={(e) => setFormData({ ...formData, muscleMass: e.target.value })}
							className="mt-1.5 h-12 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
						/>
					</div>
					<div className="col-span-1">
						<Label className="text-xs font-semibold text-gray-400 uppercase">Visceral Fat</Label>
						<Input
							type="number"
							inputMode="numeric"
							value={formData.visceralFat}
							onChange={(e) => setFormData({ ...formData, visceralFat: e.target.value })}
							className="mt-1.5 h-12 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
						/>
					</div>

					<div className="col-span-2 flex gap-3 pt-4">
						<DrawerClose asChild>
							<Button variant="outline" className="h-12 flex-1 rounded-xl">
								Cancel
							</Button>
						</DrawerClose>
						<Button
							onClick={() => onSave(formData)}
							className="h-12 flex-1 rounded-xl bg-orange-500 font-bold text-white shadow-md shadow-orange-200 dark:shadow-none"
						>
							Save Stats
						</Button>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
