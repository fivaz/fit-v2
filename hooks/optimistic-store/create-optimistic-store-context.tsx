import { createContext, ReactNode, useContext } from "react";

import {
	type Identifiable,
	useOptimisticStore,
	type UseOptimisticStoreProps,
	type UseOptimisticStoreReturn,
} from "@/hooks/optimistic-store/use-optimistic-store";

// get the same props from hook, except initial items as it will be provided by the Provider
type CreateOptimisticStoreContextProps<T> = Omit<UseOptimisticStoreProps<T>, "initialItems">;

export function createOptimisticStoreContext<T extends Identifiable>(
	optimisticStoreProps: CreateOptimisticStoreContextProps<T>,
) {
	const Context = createContext<UseOptimisticStoreReturn<T> | null>(null);

	// get only initialItems from the hook props
	type ProviderProps = Pick<UseOptimisticStoreProps<T>, "initialItems"> & {
		children: ReactNode;
	};

	function Provider({ children, initialItems }: ProviderProps) {
		// combine all props to pass to the hook
		const value = useOptimisticStore<T>({ initialItems, ...optimisticStoreProps });

		return <Context.Provider value={value}>{children}</Context.Provider>;
	}

	function useOptimisticStoreContext() {
		const context = useContext(Context);
		if (!context) throw new Error("useOptimisticStoreContext must be used within its Provider");
		return context;
	}

	return [Provider, useOptimisticStoreContext] as const;
}
