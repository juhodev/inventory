import * as React from 'react';
import { addItem } from '../../ts/api';
import { Item, NewItem } from '../types';
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

	const sendAddItem = async () => {
		await addItem(item);

		setItem({
			name: '',
			count: 0,
			location: '',
			info: '',
			link: '',
			tags: [],
		});
	};

	const updateItem = (key: string, value: string | number | string[]) => {
		const newItem: NewItem = Object.assign({}, item);
		newItem[key] = value;
		setItem(newItem);
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
			<button
				className="shadow bg-blue-500 px-3 pt-2 pb-2 rounded-lg text-white mt-6"
				onClick={sendAddItem}
			>
				CREATE
			</button>
		</div>
	);
};

export default NewItemComponent;
