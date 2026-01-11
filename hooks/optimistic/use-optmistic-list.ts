import { useOptimistic } from "react";

type Identifiable = { id: string };

type Action<T> =
	| { type: "add"; item: T }
	| { type: "update"; item: T }
	| { type: "delete"; id: string }
	| { type: "set"; items: T[] };

interface UseOptimisticListOptions<T> {
	sortFn?: (items: T[]) => T[];
}

export function useOptimisticList<T extends Identifiable>(
	initialItems: T[],
	options: UseOptimisticListOptions<T> = {},
) {
	const { sortFn } = options;

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

			return sortFn ? sortFn(newState) : newState;
		},
	);

	// Intent-based helpers
	const addItem = (item: T) => dispatch({ type: "add", item });

	const updateItem = (item: T) => dispatch({ type: "update", item });

	const deleteItem = (id: string) => dispatch({ type: "delete", id });

	const setItems = (items: T[]) => dispatch({ type: "set", items });

	return {
		optimisticItems,
		addItem,
		updateItem,
		deleteItem,
		setItems,
	};
}
