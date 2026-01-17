import { useRef, useTransition } from "react";

import { toast } from "sonner";

import { useOptimisticList } from "@/hooks/optimistic-manager/use-optmistic-list";
import { logError } from "@/lib/logger";

export function useOptimisticManager<T extends Identifiable>({
	initialItems,
	sortFnc,
	addConfig,
	updateConfig,
	deleteConfig,
	reorderConfig,
	syncConfig,
}: UseOptimisticManagerProps<T>): UseOptimisticManagerReturn<T> {
	const [isPending, startMutationTransition] = useTransition();

	const {
		addItem: optimisticAddItem,
		updateItem: optimisticUpdateItem,
		deleteItem: optimisticDeleteItem,
		setItems: optimisticSetItems,
		items,
	} = useOptimisticList({ initialItems, sortFnc });

	const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const lastStableItemsRef = useRef<T[]>(items);

	/**
	 * Internal helper to wrap mutations with the transition
	 */
	const mutateOptimistically = ({
		optimistic,
		persist,
		rollback,
		onSuccess,
		onError,
	}: OptimisticMutationParams) => {
		startMutationTransition(async () => {
			optimistic?.();

			try {
				await persist();
				onSuccess?.();
			} catch (error) {
				rollback();
				onError(error);
			}
		});
	};

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
		if (!updateConfig) {
			logError("useOptimisticManager: updateItem called but no updateConfig provided", {
				extra: { context: { item, items } },
			});
			return;
		}
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
		if (!deleteConfig) {
			logError("useOptimisticManager: deleteItem called but no deleteConfig provided", {
				extra: { context: { id, items } },
			});
			return;
		}
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

	// ---- REORDER ----
	function reorderItems(nextItems: T[], parentId?: string) {
		const prevItems = lastStableItemsRef.current;

		const nextIds = nextItems.map((i) => i.id);

		// Always update UI immediately
		optimisticSetItems(nextItems);

		// No persistence configured → stop here
		if (!reorderConfig) {
			logError("useOptimisticManager: reorderItems called but no reorderConfig provided", {
				extra: { context: { nextItems, parentId, items } },
			});
			return;
		}

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

	function syncItems(nextItems: T[], parentId: string) {
		if (!syncConfig) {
			logError("useOptimisticManager: syncItems called but no syncConfig provided", {
				extra: { nextItems },
			});
			return;
		}

		const prevItems = lastStableItemsRef.current;

		const nextIds = nextItems.map((i) => i.id);

		return mutateOptimistically({
			optimistic: () => optimisticSetItems(nextItems),
			persist: () => syncConfig.function(nextIds, parentId),
			rollback: () => optimisticSetItems(prevItems),
			onSuccess: () => {
				lastStableItemsRef.current = nextItems;
				if (syncConfig.onSuccessMessage) {
					toast.success(syncConfig.onSuccessMessage);
				}
			},
			onError: () =>
				toast.error(syncConfig.onErrorMessage, {
					description: "Your changes were rolled back. Please try again.",
				}),
		});
	}

	return {
		items,
		firstItem: items[0],
		isPending,
		addItem,
		updateItem,
		deleteItem,
		reorderItems,
		syncItems,
	};
}

// --- TYPES ---

export type Identifiable = { id: string };

type OptimisticMutationParams = {
	optimistic?: () => void;
	persist: () => Promise<void> | void;
	rollback: () => void;
	onSuccess?: () => void;
	onError: (error: unknown) => void;
};

export type UseOptimisticManagerProps<T> = {
	initialItems: T[];
	sortFnc?: (items: T[]) => T[];
	addConfig: {
		function: (item: T) => Promise<void>;
		onSuccessMessage: string;
		onErrorMessage: string;
	};
	updateConfig?: {
		function: (item: T) => Promise<void>;
		onSuccessMessage: string;
		onErrorMessage: string;
	};
	deleteConfig?: {
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
	syncConfig?: {
		function: (ids: string[], parentId: string) => Promise<void>;
		onSuccessMessage?: string;
		onErrorMessage: string;
	};
};

export type UseOptimisticManagerReturn<T> = {
	items: T[];
	firstItem: T | undefined;
	isPending: boolean;
	addItem: (item: T) => void;
	updateItem: (item: T) => void;
	deleteItem: (id: string) => void;
	reorderItems: (items: T[], parentId?: string) => void;
	syncItems: (items: T[], parentId: string) => void;
};
