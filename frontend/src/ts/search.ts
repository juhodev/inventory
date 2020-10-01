import { Item } from '../components/types';

/**
 * Now filterSearch matches item names AND tags. This should later be changed
 * to something where the user can select which it wants to match.
 *
 * @param items All the items in the inventory
 * @param userSearch The search term the user has provided
 */
export function filterSearch(items: Item[], userSearch: string): Item[] {
	const searchUpperCase = userSearch.toUpperCase();

	const filteredItems: Item[] = items.filter(
		(item) =>
			item.name.toUpperCase().startsWith(searchUpperCase) ||
			// This is a quick fix plase fix this later.
			(item.tags === undefined
				? false
				: item.tags.some((tag) => tag.startsWith(searchUpperCase))),
	);

	return filteredItems.sort((a, b) => a.lastUpdate - b.lastUpdate).reverse();
}
