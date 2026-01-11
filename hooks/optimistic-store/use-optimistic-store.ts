import { useOptimisticList } from "@/hooks/optimistic/use-optmistic-list";

export type Identifiable = { id: string };

export type UseOptimisticStoreProps<T> = {
	initialItems: T[];
	sortFnc?: (items: T[]) => T[];
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
}: UseOptimisticStoreProps<T>): UseOptimisticStoreReturn<T> {
	const value = useOptimisticList({ initialItems, sortFnc });

	return {
		...value,
	};
}
