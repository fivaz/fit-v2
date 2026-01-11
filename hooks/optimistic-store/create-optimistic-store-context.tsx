import { createContext, ReactNode, useContext } from "react";

import {
	type Identifiable,
	useOptimisticStore,
	type UseOptimisticStoreProps,
	type UseOptimisticStoreReturn,
} from "@/hooks/optimistic-store/use-optimistic-store";

type CreateOptimisticStoreContextProps<T> = Pick<UseOptimisticStoreProps<T>, "sortFnc">;

export function createOptimisticStoreContext<T extends Identifiable>({
	sortFnc,
}: CreateOptimisticStoreContextProps<T>) {
	const Context = createContext<UseOptimisticStoreReturn<T> | null>(null);

	type ProviderProps = Pick<UseOptimisticStoreProps<T>, "initialItems"> & {
		children: ReactNode;
	};

	function Provider({ children, initialItems }: ProviderProps) {
		const value = useOptimisticStore<T>({ initialItems, sortFnc });

		return <Context.Provider value={value}>{children}</Context.Provider>;
	}

	function useOptimisticStoreContext() {
		const context = useContext(Context);
		if (!context) throw new Error("useOptimisticStoreContext must be used within its Provider");
		return context;
	}

	return [Provider, useOptimisticStoreContext] as const;
}
