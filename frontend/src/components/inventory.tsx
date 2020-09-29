import * as React from 'react';
import ItemComponent from './item';
import SortComponent from './sort';
import { Item, SortType } from './types';
const { useState, useEffect } = React;

const InventoryComponent = () => {
	const [items, setItems] = useState([
		{
			name: 'MSI B450 TOMAHAWK MAX',
			count: 2,
			id: 0,
			img: 'http://placekitten.com/500/500',
			info: 'test  info',
			location: 'A1',
		},
		{
			name: 'Intel i7-8700',
			count: 1,
			id: 1,
			img: 'http://placekitten.com/500/500',
			info: 'test  info',
			location: 'A1',
		},
	]);
	const [selectedItem, setSelectedItem] = useState(-1);

	// useEffect(() => {
	// 	const itemsUrl = `http://${window.location.hostname}:8080/inventory`;

	// 	fetch(itemsUrl)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			const { inventory } = data;
	// 			setItems(inventory);
	// 		});
	// }, []);

	const itemComponents = items.map((item, i) => {
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
		<div className="inventory">
			<SortComponent
				onChange={(sortType: SortType) => {
					console.log(sortType);
				}}
			/>
			<div className="flex flex-col h-full">{itemComponents}</div>
		</div>
	);
};

export default InventoryComponent;
