import { createContext, ReactNode, useContext } from "react";

import {
	type Identifiable,
	useOptimisticList,
	type UseOptimisticListOptions,
	type UseOptimisticListReturn,
} from "@/hooks/optimistic/use-optmistic-list";

type CreateOptimisticContextProps<T> = Pick<UseOptimisticListOptions<T>, "sortFnc">;

export function createOptimisticContext<T extends Identifiable>({
	sortFnc,
}: CreateOptimisticContextProps<T>) {
	const Context = createContext<UseOptimisticListReturn<T> | null>(null);

	type ProviderProps = Pick<UseOptimisticListOptions<T>, "initialItems"> & {
		children: ReactNode;
	};

	function Provider({ children, initialItems }: ProviderProps) {
		const value = useOptimisticList<T>({ initialItems, sortFnc });

		return <Context.Provider value={value}>{children}</Context.Provider>;
	}

	function useOptimisticContext() {
		const context = useContext(Context);
		if (!context) throw new Error("useOptimisticContext must be used within its Provider");
		return context;
	}

	return [Provider, useOptimisticContext] as const;
}
