"use client";

import { createContext, ReactNode, useContext } from "react";

import { useOptimisticList } from "@/hooks/optimistic/use-optmistic-list";

type Identifiable = { id: string };

interface OptimisticContextProps<T> {
	items: T[];
	firstItem: T | undefined;
	addItem: (item: T) => void;
	updateItem: (item: T) => void;
	deleteItem: (id: string) => void;
	setItems: (items: T[]) => void;
}

export function createOptimisticContext<T extends Identifiable>(
	defaultSortFn?: (items: T[]) => T[],
) {
	const Context = createContext<OptimisticContextProps<T> | null>(null);

	function Provider({
		children,
		initialItems,
		sortFn = defaultSortFn,
	}: {
		children: ReactNode;
		initialItems: T[];
		sortFn?: (items: T[]) => T[];
	}) {
		const { optimisticItems, addItem, updateItem, deleteItem, setItems } = useOptimisticList<T>(
			initialItems,
			{ sortFn },
		);

		const value: OptimisticContextProps<T> = {
			items: optimisticItems,
			firstItem: optimisticItems[0],
			addItem,
			updateItem,
			deleteItem,
			setItems,
		};

		return <Context.Provider value={value}>{children}</Context.Provider>;
	}

	function useOptimisticContext() {
		const context = useContext(Context);
		if (!context) throw new Error("useOptimisticContext must be used within its Provider");
		return context;
	}

	return [Provider, useOptimisticContext] as const;
}
