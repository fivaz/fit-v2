import { createContext, ReactNode, useContext } from "react";

import {
	type Identifiable,
	useOptimisticManager,
	type UseOptimisticManagerProps,
	type UseOptimisticManagerReturn,
} from "@/hooks/optimistic-manager/use-optimistic-manager";

// get the same props from hook, except initial items as it will be provided by the Provider
type CreateOptimisticManagerContextProps<T> = Omit<UseOptimisticManagerProps<T>, "initialItems">;

export function createOptimisticManagerContext<T extends Identifiable>(
	optimisticManagerProps: CreateOptimisticManagerContextProps<T>,
) {
	const Context = createContext<UseOptimisticManagerReturn<T> | null>(null);

	// get only initialItems from the hook props
	type ProviderProps = Pick<UseOptimisticManagerProps<T>, "initialItems"> & {
		children: ReactNode;
	};

	function Provider({ children, initialItems }: ProviderProps) {
		// combine all props to pass to the hook
		const value = useOptimisticManager<T>({ initialItems, ...optimisticManagerProps });

		return <Context.Provider value={value}>{children}</Context.Provider>;
	}

	// you can override T when using the context for a type that implements T, this is useful for reordering based on extra attributes
	function useOptimisticManagerContext<TOverride extends T = T>() {
		const context = useContext(Context);
		if (!context) throw new Error("useOptimisticManagerContext must be used within its Provider");

		// We cast to the override type. Since TOverride extends T,
		// this is a safe "narrowing" of the type.
		return context as unknown as UseOptimisticManagerReturn<TOverride>;
	}

	return [Provider, useOptimisticManagerContext] as const;
}
