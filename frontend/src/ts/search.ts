import { Item, SortType } from '../components/types';

/**
 * Now filterSearch matches item names AND tags. This should later be changed
 * to something where the user can select which it wants to match.
 *
 * @param items All the items in the inventory
 * @param userSearch The search term the user has provided
 */
export function filterSearch(
	items: Item[],
	userSearch: string,
	sortType: SortType,
): Item[] {
	const searchUpperCase = userSearch.toUpperCase();
	const searchItems: Item[] = doSearch(searchUpperCase, items);

	return sortItems(searchItems, sortType);
}

function sortItems(items: Item[], sortType: SortType): Item[] {
	switch (sortType) {
		case SortType.LAST_UPDATED:
			return items.sort((a, b) => a.lastUpdate - b.lastUpdate).reverse();

		case SortType.NAME:
			return items.sort((a, b) => a.name.localeCompare(b.name));

		case SortType.LOCATION:
			return items.sort((a, b) => a.location.localeCompare(b.location));

		default:
			return items;
	}
}

function doSearch(searchUpperCase: string, items: Item[]): Item[] {
	if (searchUpperCase.length === 0) {
		return items;
	}

	// Is the user search doesn't contain a ":" that means that we want to match _everything_
	// If it does contain a ":" then we want to only match with the type the user supplied before the ":" char
	const isGlobalSearch: boolean = !searchUpperCase.includes(':');

	if (isGlobalSearch) {
		return globalSearch(searchUpperCase, items);
	}

	// Need to do this rather than just a split because we only want to
	// split the string only once because there might be a colon in the
	// name of the item the user is search for
	const firstIndexOfColon: number = searchUpperCase.indexOf(':');
	const searchType: string = searchUpperCase.substr(0, firstIndexOfColon);
	const searchValue: string = searchUpperCase
		.substr(firstIndexOfColon + 1, searchUpperCase.length)
		.trim()
		.toUpperCase();

	switch (searchType) {
		case 'TAG':
			return tagSearch(searchValue, items);

		case 'NAME':
			return nameSearch(searchValue, items);

		case 'LOCATION':
		case 'LOC':
			return locationSearch(searchValue, items);

		default:
			return [];
	}
}

/**
 * Global search matches with the item name and the item tags
 *
 * @param searchUpperCase The search the user used
 * @param items All the items in the user's inventory
 */
function globalSearch(searchUpperCase: string, items: Item[]): Item[] {
	return items.filter((item) => {
		const { name, tags } = item;
		const upperCaseName: string = name.toUpperCase();

		// If it already matches with the name then we can just return true
		if (upperCaseName.startsWith(searchUpperCase)) {
			return true;
		}

		if (tags !== undefined) {
			return tags.some((tag) => tag.startsWith(searchUpperCase));
		}
	});
}

function tagSearch(searchUpperCase: string, items: Item[]): Item[] {
	return items.filter((item) => {
		const { tags } = item;

		if (tags === undefined) {
			return false;
		}

		return tags.some((tag) => tag.startsWith(searchUpperCase));
	});
}

function locationSearch(searchUpperCase: string, items: Item[]): Item[] {
	return items.filter((item) => {
		const { location } = item;
		const locationUpperCase: string = location.toUpperCase();

		return locationUpperCase.startsWith(searchUpperCase);
	});
}

function nameSearch(searchUpperCase: string, items: Item[]): Item[] {
	return items.filter((item) => {
		const { name } = item;
		const nameUpperCase: string = name.toUpperCase();

		return nameUpperCase.startsWith(searchUpperCase);
	});
}
