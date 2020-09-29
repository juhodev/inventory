import * as React from 'react';
import ItemComponent from './item';
import ItemInfoComponent from './itemInfo';
import SearchComponent from './search';
import SortComponent from './sort';
import { Item, SortType } from '../types';
import { filterSearch } from '../../ts/search';

const { useState, useEffect } = React;

const InventoryComponent = () => {
	const [items, setItems] = useState([
		{
			name: 'MSI B450 TOMAHAWK MAX',
			count: 2,
			id: 0,
			img: 'https://loremflickr.com/500/500/animal',
			info: 'test  info',
			location: 'A1',
			lastUpdate: 967248000000,
		},
		{
			name: 'Intel i7-8700',
			count: 1,
			id: 1,
			img: 'https://loremflickr.com/500/500/animal',
			info: 'test  info',
			location: 'A1',
			lastUpdate: 967248000000,
		},
	]);
	const [selectedItem, setSelectedItem] = useState(-1);
	const [searchFilter, setSearchFilter] = useState('');

	// useEffect(() => {
	// 	const itemsUrl = `http://${window.location.hostname}:8080/inventory`;

	// 	fetch(itemsUrl)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			const { inventory } = data;
	// 			setItems(inventory);
	// 		});
	// }, []);

	const filteredItems: Item[] = filterSearch(items, searchFilter);
	const itemComponents = filteredItems.map((item, i) => {
		return (
			<ItemComponent
				key={item.id}
				item={item}
				onClick={() => {
					if (i === selectedItem) {
						setSelectedItem(-1);
						return;
					}

					setSelectedItem(i);
				}}
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
			<div className="flex flex-row">
				<div className="flex flex-col w-full h-full">
					{itemComponents}
				</div>
				{selectedItem !== -1 && (
					<ItemInfoComponent item={items[selectedItem]} />
				)}
			</div>
		</div>
	);
};

export default InventoryComponent;
