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

	useEffect(() => {
		fetchInventory();
	}, []);

	const filteredItems: Item[] = filterSearch(items, searchFilter);
	const itemComponents = filteredItems.map((item) => {
		return (
			<ItemComponent
				key={item.id}
				item={item}
				onClick={() => updateSelectedItem(item)}
			/>
		);
	});

	return (
		<div className="mx-24">
			<div className="flex flex-row items-center">
				<SortComponent
					onChange={(sortType: SortType) => {
						console.log(sortType);
					}}
				/>
				<SearchComponent
					onChange={(search) => {
						setSearchFilter(search);
					}}
				/>
			</div>
			<div className="flex flex-row h-4/5">
				<div className="flex flex-col w-full h-full overflow-y-scroll">
					{itemComponents}
				</div>
				{selectedItem !== undefined && (
					<ItemInfoComponent item={selectedItem} />
				)}
			</div>
		</div>
	);
};

export default InventoryComponent;
