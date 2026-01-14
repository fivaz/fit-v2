"use client";

import React from "react";

export interface ConfirmOptions {
	title: string;
	message?: string;
}

export interface ConfirmContextType {
	confirm: (options: ConfirmOptions) => Promise<boolean>;
}

export const ConfirmContext = React.createContext<ConfirmContextType | null>(null);
