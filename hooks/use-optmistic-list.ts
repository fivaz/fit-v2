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
					newState = [...state, action.item as T];
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

			// Apply custom sort function if provided
			return sortFn ? sortFn(newState) : newState;
		},
	);

	return {
		optimisticItems,
		dispatch,
	};
}
