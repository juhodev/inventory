import * as React from 'react';
import { addTag, getTags } from '../../ts/api';
import { TagSelectorComponentProps } from '../types';
import TextInputComponent from './textInput';

const { useState, useEffect } = React;

const TagSelectorComponent = (props: TagSelectorComponentProps) => {
	const [availableTags, setAvailableTags] = useState(['test', 'test2']);
	const [newTag, setNewTag] = useState('');
	const [currentTag, setCurrentTag] = useState('');

	const { onChange, tags } = props;

	useEffect(() => {
		fetchTags();
	}, []);

	const fetchTags = async () => {
		const { tags } = await getTags();
		setAvailableTags(tags);
		setCurrentTag(tags[0]);
	};

	const tagOptions: JSX.Element[] = availableTags.map((tag) => (
		<option className="bg-transparent" key={tag}>
			{tag}
		</option>
	));

	const removeTag = (tagToRemove: string) => {
		const newTags = tags.filter((tag) => tag !== tagToRemove);
		onChange(newTags);
	};

	const selectedTagComponents = tags.map((tag) => (
		<div
			key={tag}
			className="flex text-lg py-2 px-5 m-1 rounded-full font-bold text-gray-200 items-center bg-blue-500"
		>
			{tag}
			<span
				className="text-s mx-2 text-red-600 cursor-pointer"
				onClick={() => removeTag(tag)}
			>
				x
			</span>
		</div>
	));

	const sendNewTag = async () => {
		const response = await addTag(newTag);
		fetchTags();

		console.log(response);
	};

	return (
		<div className="grid gap-4 grid-cols-2 grid-flow-row font-body pt-6">
			<div className="flex flex-col font-body text-xl">
				<span className="font-bold text-gray-200">Tags</span>
				<select
					id="tags-select"
					className="block appearance-none bg-gray-600 border-b-2 border-indigo-600 mt-1 p-2 rounded focus:outline-none text-gray-200"
					onChange={(e) => setCurrentTag(e.target.value)}
				>
					{tagOptions}
				</select>
			</div>
			<div className="flex h-full w-32 items-end">
				<button
					className="shadow bg-blue-500 w-32 h-12 px-3 pt-2 pb-2 rounded-lg text-white mt-6"
					onClick={() => {
						if (tags.includes(currentTag)) {
							return;
						}

						const newTags = [...tags];
						newTags.push(currentTag);
						onChange(newTags);
					}}
				>
					ADD TAG
				</button>
			</div>
			<TextInputComponent
				title="New tag"
				placeholder="Tag"
				value={newTag}
				onChange={(value) => {
					setNewTag(value);
				}}
			/>
			<div className="flex h-full w-32 items-end">
				<button
					className="shadow bg-blue-500 w-32 h-12 px-3 pt-2 pb-2 rounded-lg text-white mt-6"
					onClick={sendNewTag}
				>
					CREATE TAG
				</button>
			</div>
			{selectedTagComponents.length > 0 && (
				<div className="flex flex-wrap w-80 border-b-2 border-indigo-600 rounded p-2 bg-gray-700">
					{selectedTagComponents}
				</div>
			)}
		</div>
	);
};

export default TagSelectorComponent;
