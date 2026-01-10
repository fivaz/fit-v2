"use client";

import type { ReactNode } from "react";
import React from "react";

import { ConfirmDialog } from "@/components/confirm-dialog";

import { ConfirmContext, type ConfirmOptions } from "./confirm-context";

interface ConfirmProviderProps {
	children: ReactNode;
}

export function ConfirmProvider({ children }: ConfirmProviderProps) {
	const [isOpen, setIsOpen] = React.useState(false);
	const [options, setOptions] = React.useState<ConfirmOptions>({
		title: "",
		message: "",
	});
	const resolveRef = React.useRef<((value: boolean) => void) | null>(null);

	const confirm = React.useCallback((confirmOptions: ConfirmOptions): Promise<boolean> => {
		setOptions(confirmOptions);
		setIsOpen(true);

		return new Promise<boolean>((resolve) => {
			resolveRef.current = resolve;
		});
	}, []);

	const handleConfirm = React.useCallback(() => {
		if (resolveRef.current) {
			resolveRef.current(true);
			resolveRef.current = null;
		}
		setIsOpen(false);
	}, []);

	const handleCancel = React.useCallback(() => {
		if (resolveRef.current) {
			resolveRef.current(false);
			resolveRef.current = null;
		}
		setIsOpen(false);
	}, []);

	return (
		<ConfirmContext.Provider value={{ confirm }}>
			{children}
			<ConfirmDialog
				isOpen={isOpen}
				title={options.title}
				message={options.message || ""}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
			/>
		</ConfirmContext.Provider>
	);
}
