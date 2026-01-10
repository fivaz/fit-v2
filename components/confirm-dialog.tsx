"use client";

import * as React from "react";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ConfirmDialogProps {
	isOpen: boolean;
	title: string;
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
}

// Content component to avoid repetition between Dialog and Drawer
const Content = ({ message }: { message: string }) => (
	<div className="flex items-start gap-4 py-4">
		<div className="bg-destructive/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
			<AlertTriangle className="text-destructive size-5" />
		</div>
		<div className="min-w-0 flex-1">
			<p className="text-muted-foreground text-sm">{message}</p>
		</div>
	</div>
);

export function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }: ConfirmDialogProps) {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
				<DialogContent className="sm:max-w-106.25">
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
					</DialogHeader>
					<Content message={message} />
					<DialogFooter className="gap-4">
						<Button variant="outline" onClick={onCancel} className="flex-1">
							Cancel
						</Button>
						<Button variant="destructive" onClick={onConfirm} className="flex-1">
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={isOpen} onOpenChange={(open) => !open && onCancel()}>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>{title}</DrawerTitle>
				</DrawerHeader>
				<div className="px-4">
					<Content message={message} />
				</div>
				<DrawerFooter className="space-y-2">
					<Button variant="outline" onClick={onCancel} className="w-full">
						Cancel
					</Button>
					<Button variant="destructive" onClick={onConfirm} className="w-full">
						Delete
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
