import * as React from 'react';
import { addTag, getTags } from '../../ts/api';
import TextInputComponent from './textInput';

const { useState, useEffect } = React;

const TagSelectorComponent = () => {
	const [availableTags, setAvailableTags] = useState(['test', 'test2']);
	const [newTag, setNewTag] = useState('');
	const [currentTag, setCurrentTag] = useState('');
	const [selectedTags, setSelectedTags] = useState([]);

	useEffect(() => {
		fetchTags();
	}, []);

	const fetchTags = async () => {
		const { tags } = await getTags();
		setAvailableTags(tags);
		setCurrentTag(tags[0]);
	};

	const tagOptions: JSX.Element[] = availableTags.map((tag) => (
		<option key={tag}>{tag}</option>
	));

	const selectedTagComponents = selectedTags.map((tag) => (
		<span
			key={tag}
			className="text-lg py-2 px-5 m-2 rounded-full font-bold text-blue-700 bg-gray-200"
		>
			{tag}
		</span>
	));

	const sendNewTag = async () => {
		const response = await addTag(newTag);
        fetchTags();
        
		console.log(response);
	};

	return (
		<div className="grid gap-4 grid-cols-2 grid-flow-row font-body pt-6">
			<div className="flex flex-col font-body text-xl">
				<span className="font-bold">Tags</span>
				<select
					id="tags-select"
					className="block appearance-none bg-white border p-2 rounded bg-gray-100 font-bold focus:outline-none"
					onChange={(e) => setCurrentTag(e.target.value)}
				>
					{tagOptions}
				</select>
			</div>
			<button
				className="shadow bg-blue-500 w-32 h-12 px-3 pt-2 pb-2 rounded-lg text-white mt-6"
				onClick={() => {
					if (selectedTags.includes(currentTag)) {
						return;
					}

					const newTags = [...selectedTags];
					newTags.push(currentTag);
					setSelectedTags(newTags);
				}}
			>
				ADD TAG
			</button>
			<TextInputComponent
				title="New tag"
				placeholder="Tag"
				onChange={(value) => {
					setNewTag(value);
				}}
			/>
			<button
				className="shadow bg-blue-500 w-32 h-12 px-3 pt-2 pb-2 rounded-lg text-white mt-6"
				onClick={sendNewTag}
			>
				CREATE TAG
			</button>
			<div className="flex flex-wrap w-80 border rounded p-5 bg-gray-100">
				{selectedTagComponents}
			</div>
		</div>
	);
};

export default TagSelectorComponent;
