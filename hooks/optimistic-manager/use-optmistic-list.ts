import { useOptimistic } from "react";

export type Identifiable = { id: string };

type Action<T> =
	| { type: "add"; item: T }
	| { type: "update"; item: T }
	| { type: "delete"; id: string }
	| { type: "set"; items: T[] };

export type UseOptimisticListOptions<T> = {
	initialItems: T[];
	sortFnc?: (items: T[]) => T[];
};

export type UseOptimisticListReturn<T> = {
	items: T[];
	firstItem: T | undefined;
	addItem: (item: T) => void;
	updateItem: (item: T) => void;
	deleteItem: (id: string) => void;
	setItems: (items: T[]) => void;
};

export function useOptimisticList<T extends Identifiable>({
	initialItems,
	sortFnc,
}: UseOptimisticListOptions<T>): UseOptimisticListReturn<T> {
	const [optimisticItems, dispatch] = useOptimistic(
		initialItems,
		(state: T[], action: Action<T>): T[] => {
			let newState: T[];

			switch (action.type) {
				case "add":
					newState = [...state, action.item];
					break;

				case "update":
					newState = state.map((item) =>
						item.id === action.item.id ? { ...item, ...action.item } : item,
					);
					break;

				case "delete":
					newState = state.filter((item) => item.id !== action.id);
					break;

				case "set":
					newState = action.items;
					break;

				default:
					return state;
			}

			return sortFnc ? sortFnc(newState) : newState;
		},
	);

	// Intent-based helpers
	const addItem = (item: T) => dispatch({ type: "add", item });

	const updateItem = (item: T) => dispatch({ type: "update", item });

	const deleteItem = (id: string) => dispatch({ type: "delete", id });

	const setItems = (items: T[]) => dispatch({ type: "set", items });

	return {
		items: optimisticItems,
		firstItem: optimisticItems[0],
		addItem,
		updateItem,
		deleteItem,
		setItems,
	};
}
