import { startTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { useOptimisticList } from "@/hooks/optimistic/use-optmistic-list";
import { ROUTES } from "@/lib/consts";
import { reportError } from "@/lib/logger";

export function useOptimisticStore<T extends Identifiable>({
	initialItems,
	sortFnc,
	add,
	update,
	delete: deleteConfig,
}: UseOptimisticStoreProps<T>): UseOptimisticStoreReturn<T> {
	const router = useRouter();
	const {
		addItem: optimisticAddItem,
		updateItem: optimisticUpdateItem,
		deleteItem: optimisticDeleteItem,
		setItems,
		items,
	} = useOptimisticList({ initialItems, sortFnc });

	// ---- ADD ----
	function addItem(item: T) {
		mutateOptimistically({
			optimistic: () => optimisticAddItem(item),
			persist: () => add.function(item),
			rollback: () => optimisticDeleteItem(item.id),
			onSuccess: () => toast.success(add.onSuccessMessage),
			onError: (error) => {
				reportError(error, { extra: { context: "Optimistic Add Item Failed", item } });
				toast.error(add.onErrorMessage, {
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

		mutateOptimistically({
			optimistic: () => optimisticUpdateItem(item),
			persist: () => update.function(item),
			rollback: () => optimisticUpdateItem(prevItem),
			onSuccess: () => toast.success(update.onSuccessMessage),
			onError: (error) => {
				reportError(error, { extra: { context: "Optimistic Update Item Failed", item } });
				toast.error(update.onErrorMessage, {
					description: "Your changes were rolled back. Please try again.",
				});
			},
		});
	}

	// ---- DELETE ----
	function deleteItem(id: string) {
		const prevItem = items.find((i) => i.id === id);

		if (!prevItem) return;

		mutateOptimistically({
			optimistic: () => optimisticDeleteItem(id),
			persist: () => deleteConfig.function(id),
			rollback: () => optimisticAddItem(prevItem),
			onSuccess: () => {
				toast.success(deleteConfig.onSuccessMessage);
				router.push(ROUTES.PROGRAMS);
			},
			onError: (error) => {
				reportError(error, { extra: { context: "Optimistic Delete Item Failed", id } });
				toast.error(deleteConfig.onErrorMessage, {
					description: "Your changes were rolled back. Please try again.",
				});
			},
		});
	}

	const firstItem = items[0];

	return {
		items,
		firstItem,
		addItem,
		updateItem,
		deleteItem,
		setItems,
	};
}

export type Identifiable = { id: string };

type OptimisticMutationParams = {
	optimistic: () => void;
	persist: () => Promise<void>;
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
	add: {
		function: (item: T) => Promise<void>;
		onSuccessMessage: string;
		onErrorMessage: string;
	};
	update: {
		function: (item: T) => Promise<void>;
		onSuccessMessage: string;
		onErrorMessage: string;
	};
	delete: {
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
