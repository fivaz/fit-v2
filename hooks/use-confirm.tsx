"use client";

import React from "react";

import { ConfirmContext } from "./confirm-context";

export function useConfirm() {
	const context = React.useContext(ConfirmContext);
	if (!context) {
		throw new Error("useConfirm must be used within ConfirmProvider");
	}
	return context.confirm;
}
