import { startTransition } from "react";

import { toast } from "sonner";

import { useOptimisticList } from "@/hooks/optimistic/use-optmistic-list";
import { reportError } from "@/lib/logger";

export type Identifiable = { id: string };

type OptimisticMutationParams = {
	optimistic: () => void;
	persist: () => Promise<void>;
	rollback: () => void;
	onSuccess?: () => void;
	onError?: (error: unknown) => void;
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
			onSuccess?.();
		} catch (error) {
			rollback();
			onError?.(error);
		}
	});
}

export type UseOptimisticStoreProps<T> = {
	initialItems: T[];
	sortFnc?: (items: T[]) => T[];
	add: {
		function: (item: T) => Promise<void>;
		onSuccessMessage?: string;
		onErrorMessage?: string;
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

export function useOptimisticStore<T extends Identifiable>({
	initialItems,
	sortFnc,
	add,
}: UseOptimisticStoreProps<T>): UseOptimisticStoreReturn<T> {
	const {
		addItem: optimisticAddItem,
		deleteItem: optimisticDeleteItem,
		...props
	} = useOptimisticList({ initialItems, sortFnc });

	function addItem(item: T) {
		mutateOptimistically({
			optimistic: () => optimisticAddItem(item),
			persist: () => add.function(item),
			rollback: () => optimisticDeleteItem(item.id),
			onSuccess: () => toast.success(add.onSuccessMessage),
			onError: (error) => {
				reportError(error, { extra: { context: "Optimistic Add Item Failed", item } });
				toast.error(add.onErrorMessage || "An error occurred. Changes rolled back.");
			},
		});
	}

	return {
		addItem,
		deleteItem: optimisticDeleteItem,
		...props,
	};
}
