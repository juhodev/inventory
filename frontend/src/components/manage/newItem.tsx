import * as React from 'react';
import { addItem } from '../../ts/api';
import { ItemInventoryResponse, NewItem } from '../types';
import TagSelectorComponent from './tagsSelector';
import TextAreaComponent from './textArea';
import TextInputComponent from './textInput';

const { useState } = React;

const NewItemComponent = () => {
	const [item, setItem] = useState<NewItem>({
		name: '',
		count: 0,
		location: '',
		info: '',
		link: '',
		tags: [],
	});
	const [error, setError] = useState('');

	const sendAddItem = async () => {
		const response: ItemInventoryResponse = await addItem(item);

		const { error, message } = response;

		if (error) {
			setError(message);
			return;
		}

		// The best 'feedback' for creating an item is to show the inventory and because currently by default it's
		// sorted by last updated it will display the lastly created item first. In the future we should most likely
		// also select it (display it on the side)
		window.location.replace('/');
	};

	const updateItem = (key: string, value: string | number | string[]) => {
		const newItem: NewItem = Object.assign({}, item);
		newItem[key] = value;
		setItem(newItem);

		if (error.length > 0) {
			setError('');
		}
	};

	const { name, count, location, info, link, tags } = item;

	return (
		<div className="font-body pl-24">
			<div className="pt-12 grid grid-cols-2 grid-flow-row gap-4">
				<TextInputComponent
					title="Name"
					placeholder="Item name"
					value={name}
					onChange={(value) => updateItem('name', value)}
				/>
				<TextInputComponent
					title="Location"
					placeholder="Item location"
					value={location}
					onChange={(value) => updateItem('location', value)}
				/>
				<TextInputComponent
					title="Quantity"
					placeholder="0"
					value={count.toString()}
					onChange={(value) => updateItem('count', value)}
				/>
				<TextInputComponent
					title="Link"
					placeholder="https://google.com"
					value={link}
					onChange={(value) => updateItem('link', value)}
				/>
				<TextAreaComponent
					title="Info"
					placeholder="Info about the item"
					value={info}
					onChange={(value) => updateItem('info', value)}
				/>
			</div>
			<TagSelectorComponent
				tags={tags}
				onChange={(tags) => updateItem('tags', tags)}
			/>
			<div>
				<button
					className="shadow bg-blue-500 px-3 pt-2 pb-2 rounded-lg text-white mt-6"
					onClick={sendAddItem}
				>
					CREATE
				</button>
				{error.length > 0 && (
					<span className="px-3 text-lg text-red-500">{error}</span>
				)}
			</div>
		</div>
	);
};

export default NewItemComponent;
