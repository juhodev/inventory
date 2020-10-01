import * as React from 'react';
import { getInventory } from '../../ts/api';
import { filterSearch } from '../../ts/search';
import ItemComponent from '../inventory/item';
import SearchComponent from '../inventory/search';
import { Item } from '../types';
import SmallItemComponent from './smallItem';
import TagSelectorComponent from './tagsSelector';
import TextAreaComponent from './textArea';
import TextInputComponent from './textInput';

const { useState, useEffect } = React;

const EditItemComponent = () => {
	const [items, setItems] = useState([]);
	const [searchFilter, setSearchFilter] = useState('');
	const [selectedId, setSelectedId] = useState(-1);

	const [name, setName] = useState('');
	const [location, setLocation] = useState('');
	const [quantity, setQuantity] = useState('');
	const [link, setLink] = useState('');
	const [info, setInfo] = useState('');
	const [tags, setTags] = useState([]);

	const fetchInventory = async () => {
		const { inventory } = await getInventory();
		setItems(inventory);
	};

	const updateSelectedItem = (item: Item) => {
		if (selectedId === item.id) {
			clearInputs();
			return;
		}

		setName(item.name);
		setLocation(item.location);
		setQuantity(item.count + '');
		setLink(item.link);
		setInfo(item.info);
		setTags(item.tags);
		setSelectedId(item.id);
	};

	const clearInputs = () => {
		setName('');
		setLocation('');
		setQuantity('');
		setLink('');
		setInfo('');
		setTags([]);
	};

	useEffect(() => {
		fetchInventory();
	}, []);

	const filteredItems: Item[] = filterSearch(items, searchFilter);
	const itemComponents = filteredItems.map((item) => (
		<SmallItemComponent
			key={item.id}
			item={item}
			onClick={() => updateSelectedItem(item)}
		/>
	));

	return (
		<div className="font-body pl-24 flex flex-row flex-shrink-1 h-4/5">
			<div className="pt-12 w-102">
				<SearchComponent
					onChange={(search) => {
						setSearchFilter(search);
					}}
				/>
				<div className="flex flex-col flex-grow w-full h-102 overflow-y-scroll">
					{itemComponents}
				</div>
			</div>
			<div>
				<div className="pl-6 pt-12 grid grid-cols-2 grid-flow-row gap-4">
					<TextInputComponent
						title="Name"
						placeholder="Item name"
						value={name}
						onChange={(value) => {
							setSelectedId(-1);
							setName(value);
						}}
					/>
					<TextInputComponent
						title="Location"
						placeholder="Item location"
						value={location}
						onChange={(value) => {
							setSelectedId(-1);
							setLocation(value);
						}}
					/>
					<TextInputComponent
						title="Quantity"
						placeholder="0"
						value={quantity}
						onChange={(value) => {
							setSelectedId(-1);
							setQuantity(value);
						}}
					/>
					<TextInputComponent
						title="Link"
						placeholder="https://google.com"
						value={link}
						onChange={(value) => {
							setSelectedId(-1);
							setLink(value);
						}}
					/>
					<div className="col-span-2 w-4/5">
						<TextAreaComponent
							title="Info"
							placeholder="Info about the item"
							value={info}
							onChange={(value) => {
								setSelectedId(-1);
								setInfo(value);
							}}
						/>
					</div>
					<TagSelectorComponent
						onChange={(tags) => {
							setTags(tags);
						}}
					/>
				</div>
				<button
					className="shadow bg-blue-500 ml-6 px-3 pt-2 pb-2 rounded-lg text-white mt-6"
					onClick={() => {}}
				>
					UPDATE
				</button>
			</div>
		</div>
	);
};

export default EditItemComponent;
