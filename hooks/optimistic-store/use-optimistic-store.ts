import { startTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { useOptimisticList } from "@/hooks/optimistic/use-optmistic-list";
import { ROUTES } from "@/lib/consts";
import { logError } from "@/lib/logger";

export function useOptimisticStore<T extends Identifiable>({
	initialItems,
	sortFnc,
	addConfig,
	updateConfig,
	deleteConfig,
}: UseOptimisticStoreProps<T>): UseOptimisticStoreReturn<T> {
	const {
		addItem: optimisticAddItem,
		updateItem: optimisticUpdateItem,
		deleteItem: optimisticDeleteItem,
		setItems,
		items,
	} = useOptimisticList({ initialItems, sortFnc });

	// ---- ADD ----
	function addItem(item: T) {
		return mutateOptimistically({
			optimistic: () => optimisticAddItem(item),
			persist: () => addConfig.function(item),
			rollback: () => optimisticDeleteItem(item.id),
			onSuccess: () => toast.success(addConfig.onSuccessMessage),
			onError: (error) => {
				logError(error, { extra: { context: "Optimistic Add Item Failed", item } });
				toast.error(addConfig.onErrorMessage, {
					description: "Your changes were rolled back. Please try again.",
				});
			},
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
			onError: (error) => {
				logError(error, { extra: { context: "Optimistic Update Item Failed", item } });
				toast.error(updateConfig.onErrorMessage, {
					description: "Your changes were rolled back. Please try again.",
				});
			},
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
			onError: (error) => {
				logError(error, { extra: { context: "Optimistic Delete Item Failed", id } });
				toast.error(deleteConfig.onErrorMessage, {
					description: "Your changes were rolled back. Please try again.",
				});
			},
		});
	}

	return {
		items,
		firstItem: items[0],
		addItem,
		updateItem,
		deleteItem,
		setItems,
	};
}

export type Identifiable = { id: string };

type OptimisticMutationParams = {
	optimistic: () => void;
	persist: () => Promise<void> | void;
	rollback: () => void;
	onSuccess: () => void;
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
		optimistic();

		try {
			await persist();
			onSuccess();
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
};

export type UseOptimisticStoreReturn<T> = {
	items: T[];
	firstItem: T | undefined;
	addItem: (item: T) => void;
	updateItem: (item: T) => void;
	deleteItem: (id: string) => void;
	setItems: (items: T[]) => void;
};
