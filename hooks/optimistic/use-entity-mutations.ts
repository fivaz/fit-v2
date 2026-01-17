import { startTransition, useEffect, useRef } from "react";

import { EntityStoreReturn, Identifiable } from "@/hooks/optimistic/create-entity-store";

type PersistConfig<T> = {
	persist: () => Promise<void>;
	onSuccess?: (items: T[]) => void;
	onError?: (error: unknown, previousItems: T[]) => void;
};

export function createEntityMutations<T extends Identifiable>(
	useStore: () => EntityStoreReturn<T>,
) {
	return function useEntityMutations() {
		const store = useStore();

		// Keep ref updated with latest committed state
		useEffect(() => {
			latestItemsRef.current = store.items;
		}, [store.items]);

		// Always points to the latest committed state
		const latestItemsRef = useRef<T[]>(store.items);

		async function runMutation(optimisticUpdate: () => void, config?: PersistConfig<T>) {
			startTransition(() => optimisticUpdate());

			if (!config) return;

			try {
				await config.persist();

				config.onSuccess?.(latestItemsRef.current);
			} catch (error) {
				startTransition(() => store.setItems(latestItemsRef.current));
				config.onError?.(error, latestItemsRef.current);
			}
		}

		return {
			addItem(item: T, config?: PersistConfig<T>) {
				runMutation(() => store.addItem(item), config);
			},

			updateItem(item: T, config?: PersistConfig<T>) {
				runMutation(() => store.updateItem(item), config);
			},

			deleteItem(id: string, config?: PersistConfig<T>) {
				runMutation(() => store.deleteItem(id), config);
			},

			setItems(items: T[], config?: PersistConfig<T>) {
				runMutation(() => store.setItems(items), config);
			},
		};
	};
}
