"use client";

import React, { useEffect, useState } from "react";

import { Loader2, Save } from "lucide-react";

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

interface ProfileData {
	full_name: string;
	weight: string;
	bodyFat: string;
	muscleMass: string;
	visceralFat: string;
}

interface ProfileDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	initialData: ProfileData;
}

export function ProfileDrawer({ isOpen, onClose, initialData }: ProfileDrawerProps) {
	const [formData, setFormData] = useState<ProfileData>(initialData);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		if (isOpen) setFormData(initialData);
	}, [initialData, isOpen]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSaving(true);
		// Future mutation logic here
		setTimeout(() => {
			setIsSaving(false);
			onClose();
		}, 1000);
	};

	return (
		<Drawer open={isOpen} onOpenChange={(val) => !val && onClose()}>
			<DrawerContent className="px-5 pb-10">
				<DrawerHeader className="px-0">
					<DrawerTitle>Edit Profile & Stats</DrawerTitle>
					<DrawerDescription>Update your name and body composition metrics.</DrawerDescription>
				</DrawerHeader>

				<form onSubmit={handleSubmit} className="space-y-5 pt-4">
					<div>
						<Label className="text-xs font-bold text-gray-400 uppercase">Full Name</Label>
						<Input
							value={formData.full_name}
							onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
							className="mt-1.5 h-12 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label className="text-xs font-bold text-gray-400 uppercase">Weight (kg)</Label>
							<Input
								type="number"
								value={formData.weight}
								onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
								className="mt-1.5 h-12 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
							/>
						</div>
						<div>
							<Label className="text-xs font-bold text-gray-400 uppercase">Body Fat (%)</Label>
							<Input
								type="number"
								value={formData.bodyFat}
								onChange={(e) => setFormData({ ...formData, bodyFat: e.target.value })}
								className="mt-1.5 h-12 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
							/>
						</div>
						<div>
							<Label className="text-xs font-bold text-gray-400 uppercase">Muscle (%)</Label>
							<Input
								type="number"
								value={formData.muscleMass}
								onChange={(e) => setFormData({ ...formData, muscleMass: e.target.value })}
								className="mt-1.5 h-12 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
							/>
						</div>
						<div>
							<Label className="text-xs font-bold text-gray-400 uppercase">Visceral Fat</Label>
							<Input
								type="number"
								value={formData.visceralFat}
								onChange={(e) => setFormData({ ...formData, visceralFat: e.target.value })}
								className="mt-1.5 h-12 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
							/>
						</div>
					</div>

					<div className="flex gap-3 pt-4">
						<DrawerClose asChild>
							<Button type="button" variant="outline" className="h-12 flex-1 rounded-xl">
								Cancel
							</Button>
						</DrawerClose>
						<Button
							type="submit"
							disabled={isSaving}
							className="h-12 flex-1 rounded-xl bg-orange-500 font-bold text-white"
						>
							{isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
						</Button>
					</div>
				</form>
			</DrawerContent>
		</Drawer>
	);
}
