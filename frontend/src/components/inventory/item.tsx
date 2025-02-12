import * as React from 'react';
import { timeSince } from '../../utils/timeUtils';
import { ItemComponentProps } from '../types';

const ItemComponent = (props: ItemComponentProps) => {
	const { item, onClick, onTagClick } = props;
	const { img, name, location, count, lastUpdate, tags } = item;

	const tagComponents =
		// This is a quick fix please fix this later
		tags === undefined
			? []
			: tags.map((tag) => (
					<span
						onClick={() => onTagClick(tag)}
						key={tag}
						className="text-lg py-2 px-5 m-2 h-10 rounded-full font-bold text-gray-300 bg-blue-500 cursor-pointer"
					>
						{tag}
					</span>
			  ));

	return (
		<div className="container flex flex-row h-42 mx-auto px-4 p-6 border-b-2 border-indigo-600 font-body">
			<div className="flex justify-center items-center w-32 h-32 cursor-pointer">
				<img
					className="max-w-20 rounded-lg"
					onClick={onClick}
					src={
						img === undefined
							? 'https://loremflickr.com/500/500/animal'
							: img
					}
				/>
			</div>
			<div className="pl-6 flex flex-col h-full cursor-pointer" onClick={onClick}>
				<div className="flex flex-col w-full">
					<span className="font-bold text-3xl leading-none text-blue-500">
						{name}
					</span>
					<span className="text-xl text-gray-400">
						Last updated {timeSince(new Date(lastUpdate))} ago
					</span>
				</div>
				<div className="flex h-full text-xl">
					<span className="self-end text-gray-200">Location</span>
					<span className="self-end px-3 text-gray-400">
						{location}
					</span>
					<span className="self-end pr-3 text-gray-200">
						Quantity
					</span>
					<span className="self-end text-gray-400">{count}</span>
				</div>
			</div>
			<div className="flex flex-grow flex-wrap justify-end">
				{tagComponents}
			</div>
		</div>
	);
};

export default ItemComponent;
