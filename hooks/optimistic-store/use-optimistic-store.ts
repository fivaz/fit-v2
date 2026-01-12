import { startTransition, useRef } from "react";

import { toast } from "sonner";

import { useOptimisticList } from "@/hooks/optimistic/use-optmistic-list";

export function useOptimisticStore<T extends Identifiable>({
	initialItems,
	sortFnc,
	addConfig,
	updateConfig,
	deleteConfig,
	reorderConfig,
}: UseOptimisticStoreProps<T>): UseOptimisticStoreReturn<T> {
	const {
		addItem: optimisticAddItem,
		updateItem: optimisticUpdateItem,
		deleteItem: optimisticDeleteItem,
		setItems: optimisticSetItems,
		items,
	} = useOptimisticList({ initialItems, sortFnc });

	const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const lastStableItemsRef = useRef<T[]>(items);

	// ---- ADD ----
	function addItem(item: T) {
		return mutateOptimistically({
			optimistic: () => optimisticAddItem(item),
			persist: () => addConfig.function(item),
			rollback: () => optimisticDeleteItem(item.id),
			onSuccess: () => toast.success(addConfig.onSuccessMessage),
			onError: () =>
				toast.error(addConfig.onErrorMessage, {
					description: "Your changes were rolled back. Please try again.",
				}),
		});
	}

	// ---- UPDATE ----
	function updateItem(item: T) {
		// store previous state for rollback
		const prevItem = items.find((i) => i.id === item.id);

		if (!prevItem) return;

		return mutateOptimistically({
			optimistic: () => optimisticUpdateItem(item),
			persist: () => updateConfig.function(item),
			rollback: () => optimisticUpdateItem(prevItem),
			onSuccess: () => toast.success(updateConfig.onSuccessMessage),
			onError: () =>
				toast.error(updateConfig.onErrorMessage, {
					description: "Your changes were rolled back. Please try again.",
				}),
		});
	}

	// ---- DELETE ----
	function deleteItem(id: string) {
		const prevItem = items.find((i) => i.id === id);

		if (!prevItem) return;

		return mutateOptimistically({
			optimistic: () => optimisticDeleteItem(id),
			persist: () => deleteConfig.function(id),
			rollback: () => optimisticAddItem(prevItem),
			onSuccess: () => toast.success(deleteConfig.onSuccessMessage),
			onError: () =>
				toast.error(deleteConfig.onErrorMessage, {
					description: "Your changes were rolled back. Please try again.",
				}),
		});
	}

	function reorderItems(nextItems: T[], parentId?: string) {
		const prevItems = lastStableItemsRef.current;

		const nextIds = nextItems.map((i) => i.id);

		// Always update UI immediately
		optimisticSetItems(nextItems);

		// No persistence configured → stop here
		if (!reorderConfig) return;

		// Clear previous debounce
		if (debounceTimeoutRef.current) {
			clearTimeout(debounceTimeoutRef.current);
		}

		// Schedule persistence
		debounceTimeoutRef.current = setTimeout(() => {
			mutateOptimistically({
				//optimistic already applied
				persist: async () => {
					await reorderConfig.function(nextIds, parentId);
					lastStableItemsRef.current = nextItems;
				},
				rollback: () => {
					optimisticSetItems(prevItems);
				},
				onError: () =>
					toast.error(reorderConfig.onErrorMessage, {
						description: "Your changes were rolled back. Please try again.",
					}),
			});
		}, reorderConfig.debounceMs ?? 500);
	}

	return {
		items,
		firstItem: items[0],
		addItem,
		updateItem,
		deleteItem,
		reorderItems,
	};
}

export type Identifiable = { id: string };

type OptimisticMutationParams = {
	optimistic?: () => void;
	persist: () => Promise<void> | void;
	rollback: () => void;
	onSuccess?: () => void;
	onError: (error: unknown) => void;
};

function mutateOptimistically({
	optimistic,
	persist,
	rollback,
	onSuccess,
	onError,
}: OptimisticMutationParams) {
	startTransition(async () => {
		optimistic?.();

		try {
			await persist();
			onSuccess?.();
		} catch (error) {
			rollback();
			onError(error);
		}
	});
}

export type UseOptimisticStoreProps<T> = {
	initialItems: T[];
	sortFnc?: (items: T[]) => T[];
	addConfig: {
		function: (item: T) => Promise<void>;
		onSuccessMessage: string;
		onErrorMessage: string;
	};
	updateConfig: {
		function: (item: T) => Promise<void>;
		onSuccessMessage: string;
		onErrorMessage: string;
	};
	deleteConfig: {
		function: (id: string) => Promise<void>;
		onSuccessMessage: string;
		onErrorMessage: string;
	};
	reorderConfig?: {
		function: (ids: string[], parentId?: string) => Promise<void>;
		onSuccessMessage?: string;
		onErrorMessage: string;
		debounceMs?: number;
	};
};

export type UseOptimisticStoreReturn<T> = {
	items: T[];
	firstItem: T | undefined;
	addItem: (item: T) => void;
	updateItem: (item: T) => void;
	deleteItem: (id: string) => void;
	reorderItems: (items: T[], parentId?: string) => void;
};
