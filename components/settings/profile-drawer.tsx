"use client";

import React, { useEffect, useState } from "react";

import { Activity, Loader2, Save, User } from "lucide-react";

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
	email: string;
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
		setTimeout(() => {
			setIsSaving(false);
			onClose();
		}, 800);
	};

	return (
		<Drawer open={isOpen} onOpenChange={(val) => !val && onClose()}>
			<DrawerContent className="max-h-[90vh] overflow-y-auto px-5 pb-10">
				<DrawerHeader className="px-0">
					<DrawerTitle>Edit Profile & Stats</DrawerTitle>
					<DrawerDescription>Update your personal info and body composition.</DrawerDescription>
				</DrawerHeader>

				<form onSubmit={handleSubmit} className="space-y-8 pt-4">
					{/* Personal Section */}
					<section className="space-y-4">
						<div className="mb-2 flex items-center gap-2 text-orange-500">
							<User className="size-4" />
							<h4 className="text-xs font-bold tracking-widest uppercase">Personal Info</h4>
						</div>
						<div>
							<Label className="text-xs font-semibold text-gray-400">Full Name</Label>
							<Input
								value={formData.full_name}
								onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
								className="mt-1.5 h-12 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
							/>
						</div>
						<div>
							<Label className="text-xs font-semibold text-gray-400">Email Address</Label>
							<Input
								type="email"
								value={formData.email}
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
								className="mt-1.5 h-12 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
							/>
						</div>
					</section>

					{/* Body Composition Section */}
					<section className="space-y-4">
						<div className="mb-2 flex items-center gap-2 text-orange-500">
							<Activity className="size-4" />
							<h4 className="text-xs font-bold tracking-widest uppercase">Body Metrics</h4>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label className="text-xs font-semibold text-gray-400">Weight (kg)</Label>
								<Input
									type="number"
									inputMode="decimal"
									value={formData.weight}
									onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
									className="mt-1.5 h-12 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
								/>
							</div>
							<div>
								<Label className="text-xs font-semibold text-gray-400">Body Fat (%)</Label>
								<Input
									type="number"
									inputMode="decimal"
									value={formData.bodyFat}
									onChange={(e) => setFormData({ ...formData, bodyFat: e.target.value })}
									className="mt-1.5 h-12 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
								/>
							</div>
							<div>
								<Label className="text-xs font-semibold text-gray-400">Muscle (%)</Label>
								<Input
									type="number"
									inputMode="decimal"
									value={formData.muscleMass}
									onChange={(e) => setFormData({ ...formData, muscleMass: e.target.value })}
									className="mt-1.5 h-12 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
								/>
							</div>
							<div>
								<Label className="text-xs font-semibold text-gray-400">Visceral Fat</Label>
								<Input
									type="number"
									inputMode="numeric"
									value={formData.visceralFat}
									onChange={(e) => setFormData({ ...formData, visceralFat: e.target.value })}
									className="mt-1.5 h-12 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
								/>
							</div>
						</div>
					</section>

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
