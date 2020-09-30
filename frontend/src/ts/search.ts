import { Item } from '../components/types';

/**
 * For now this only matches by the user search but in the future take in account typos and tags
 *
 * @param items All the items in the inventory
 * @param userSearch The search term the user has provided
 */
export function filterSearch(items: Item[], userSearch: string): Item[] {
	const searchLowerCase = userSearch.toLowerCase();

	const filteredItems: Item[] = items.filter((item) =>
		item.name.toLowerCase().startsWith(searchLowerCase),
	);

	return filteredItems.sort((a, b) => a.lastUpdate - b.lastUpdate);
}
