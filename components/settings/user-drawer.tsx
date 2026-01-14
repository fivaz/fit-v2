"use client";

import React, { useEffect, useState } from "react";

import { Loader2, Save, User } from "lucide-react";

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

export function UserDrawer({ isOpen, onClose, initialData, onSave }: any) {
	const [formData, setFormData] = useState(initialData);

	useEffect(() => {
		if (isOpen) setFormData(initialData);
	}, [initialData, isOpen]);

	return (
		<Drawer open={isOpen} onOpenChange={(val) => !val && onClose()}>
			<DrawerContent className="px-5 pb-10">
				<DrawerHeader className="px-0">
					<DrawerTitle>Account Settings</DrawerTitle>
					<DrawerDescription>Update your name and contact information.</DrawerDescription>
				</DrawerHeader>

				<div className="space-y-4 pt-4">
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

					<div className="flex gap-3 pt-4">
						<DrawerClose asChild>
							<Button variant="outline" className="h-12 flex-1 rounded-xl">
								Cancel
							</Button>
						</DrawerClose>
						<Button
							onClick={() => onSave(formData)}
							className="h-12 flex-1 rounded-xl bg-orange-500 font-bold text-white"
						>
							Save Account
						</Button>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
