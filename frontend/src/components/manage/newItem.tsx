import * as React from 'react';
import { addItem } from '../../ts/api';
import TagSelectorComponent from './tagsSelector';
import TextAreaComponent from './textArea';
import TextInputComponent from './textInput';

const { useState } = React;

const NewItemComponent = () => {
	const [name, setName] = useState('');
	const [location, setLocation] = useState('');
	const [quantity, setQuantity] = useState('0');
	const [link, setLink] = useState('');
	const [info, setInfo] = useState('');
	const [tags, setTags] = useState([]);

	const sendAddItem = async () => {
		const response = await addItem(
			name,
			location,
			quantity,
			link,
			info,
			tags,
		);

		console.log(response);
	};

	return (
		<div className="font-body pl-24">
			<div className="pt-12 grid grid-cols-2 grid-flow-row gap-4">
				<TextInputComponent
					title="Name"
					placeholder="Item name"
					onChange={(value) => {
						setName(value);
					}}
				/>
				<TextInputComponent
					title="Location"
					placeholder="Item location"
					onChange={(value) => {
						setLocation(value);
					}}
				/>
				<TextInputComponent
					title="Quantity"
					placeholder="0"
					onChange={(value) => {
						setQuantity(value);
					}}
				/>
				<TextInputComponent
					title="Link"
					placeholder="https://google.com"
					onChange={(value) => {
						setLink(value);
					}}
				/>
				<TextAreaComponent
					title="Info"
					placeholder="Info about the item"
					onChange={(value) => {
						setInfo(info);
					}}
				/>
			</div>
			<TagSelectorComponent
				onChange={(tags) => {
					setTags(tags);
				}}
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
