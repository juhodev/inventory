import * as React from 'react';
import ItemComponent from './item';
import ItemInfoComponent from './itemInfo';
import SearchComponent from './search';
import SortComponent from './sort';
import { Item, SortType } from '../types';
import { filterSearch } from '../../ts/search';
import { getInventory } from '../../ts/api';

const { useState, useEffect } = React;

const InventoryComponent = () => {
	const [items, setItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState(undefined);
	const [searchFilter, setSearchFilter] = useState('');
	const [sortType, setSortType] = useState<SortType>(SortType.LAST_UPDATED);

	const fetchInventory = async () => {
		const { inventory } = await getInventory();
		setItems(inventory);
	};

	const updateSelectedItem = (item: Item) => {
		if (selectedItem !== undefined && selectedItem.id === item.id) {
			setSelectedItem(undefined);
			return;
		}

		setSelectedItem(item);
	};

	const updateSearchFilter = (tag: string) => {
		const newFilter: string = `tag:${tag}`;

		// If the the user is already searching for the tag then we should clear the search field
		if (searchFilter === newFilter) {
			setSearchFilter('');
			return;
		}

		setSearchFilter(newFilter);
	};

	useEffect(() => {
		fetchInventory();
	}, []);

	const filteredItems: Item[] = filterSearch(items, searchFilter, sortType);
	const itemComponents = filteredItems.map((item) => {
		return (
			<ItemComponent
				key={item.id}
				item={item}
				onClick={() => updateSelectedItem(item)}
				onTagClick={(tag) => updateSearchFilter(tag)}
			/>
		);
	});

	return (
		<div className="mx-24">
			<div className="flex flex-row items-center">
				<SortComponent
					onChange={(sortType: SortType) => {
						setSortType(sortType);
					}}
				/>
				<SearchComponent
					value={searchFilter}
					onChange={(search) => {
						setSearchFilter(search);
					}}
				/>
			</div>
			<div className="flex flex-row h-4/5">
				<div className="flex flex-col w-2/3 h-full overflow-y-scroll">
					{itemComponents}
				</div>
				<div className="w-1/3 justify-center">
					{selectedItem !== undefined && (
						<ItemInfoComponent item={selectedItem} />
					)}
				</div>
			</div>
		</div>
	);
};

export default InventoryComponent;
