import * as React from 'react';
import { getInventory, updateItem } from '../../ts/api';
import { filterSearch } from '../../ts/search';
import SearchComponent from '../inventory/search';
import { EditItem, Item, ItemInventoryResponse, SortType } from '../types';
import SmallItemComponent from './smallItem';
import TagSelectorComponent from './tagsSelector';
import TextAreaComponent from './textArea';
import TextInputComponent from './textInput';

const { useState, useEffect } = React;

const EditItemComponent = () => {
	const [items, setItems] = useState<Item[]>([]);
	const [searchFilter, setSearchFilter] = useState<string>('');
	const [selectedId, setSelectedId] = useState<number>(-1);
	const [error, setError] = useState<string>('');

	const [item, setItem] = useState<EditItem>({
		id: -1,
		name: '',
		tags: [],
		link: '',
		count: 0,
		info: '',
		location: '',
	});

	const fetchInventory = async () => {
		const { inventory } = await getInventory();
		setItems(inventory);
	};

	const localItemUpdate = (
		key: string,
		value: string | number | string[],
	) => {
		const newItem: EditItem = Object.assign({}, item);
		newItem[key] = value;
		setItem(newItem);

		if (error.length > 0) {
			setError('');
		}
	};

	const sendItemUpdate = async () => {
		const response: ItemInventoryResponse = await updateItem(item);
		const { error, message } = response;

		if (error) {
			setError(message);
			return;
		}
	};

	const updateSelectedItem = (item: Item) => {
		if (selectedId === item.id) {
			clearInputs();
			return;
		}

		const { id, name, tags, link, count, info, location } = item;
		setItem({ id, name, tags, link, count, info, location });
		setSelectedId(id);
	};

	const clearInputs = () => {
		setSelectedId(-1);
		setItem({
			id: -1,
			name: '',
			tags: [],
			link: '',
			count: 0,
			info: '',
			location: '',
		});
	};

	useEffect(() => {
		fetchInventory();
	}, []);

	const { name, tags, link, count, info, location } = item;

	const filteredItems: Item[] = filterSearch(
		items,
		searchFilter,
		SortType.LAST_UPDATED,
	);
	const itemComponents = filteredItems.map((item) => (
		<SmallItemComponent
			key={item.id}
			item={item}
			onClick={() => updateSelectedItem(item)}
		/>
	));

	return (
		<div className="font-body pl-24 flex flex-row flex-shrink-1 h-4/5">
			<div className="pt-12">
				<SearchComponent
					value={searchFilter}
					onChange={(search) => {
						setSearchFilter(search);
					}}
				/>
				<div className="flex flex-col flex-grow w-full h-102 overflow-y-scroll">
					{itemComponents}
				</div>
			</div>
			<div className="pl-6">
				<div className="pt-12 grid grid-cols-2 grid-flow-row gap-4">
					<TextInputComponent
						title="Name"
						placeholder="Item name"
						value={name}
						onChange={(value) => localItemUpdate('name', value)}
					/>
					<TextInputComponent
						title="Location"
						placeholder="Item location"
						value={location}
						onChange={(value) => localItemUpdate('location', value)}
					/>
					<TextInputComponent
						title="Quantity"
						placeholder="0"
						value={count.toString()}
						onChange={(value) => localItemUpdate('count', value)}
					/>
					<TextInputComponent
						title="Link"
						placeholder="https://google.com"
						value={link}
						onChange={(value) => localItemUpdate('link', value)}
					/>
					<TextAreaComponent
						title="Info"
						placeholder="Info about the item"
						value={info}
						onChange={(value) => localItemUpdate('info', value)}
					/>
				</div>
				<TagSelectorComponent
					tags={tags}
					onChange={(tags) => localItemUpdate('tags', tags)}
				/>
				<div>
					<button
						className="shadow bg-blue-500 px-3 pt-2 pb-2 rounded-lg text-white mt-6"
						onClick={sendItemUpdate}
					>
						UPDATE
					</button>
					<span className="px-3 text-lg text-red-500">{error}</span>
				</div>
			</div>
		</div>
	);
};

export default EditItemComponent;
