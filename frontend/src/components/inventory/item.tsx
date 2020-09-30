import * as React from 'react';
import { timeSince } from '../../utils/timeUtils';
import { ItemComponentProps } from '../types';

const ItemComponent = (props: ItemComponentProps) => {
	const { item, onClick } = props;
	const { img, name, location, count, lastUpdate } = item;

	return (
		<div
			className="container flex flex-row h-42 mx-auto px-4 p-6 border-b-2 border-indigo-600 font-body cursor-pointer"
			onClick={onClick}
		>
			<div className="flex justify-center items-center w-32 h-32">
				<img
					className="max-w-20 rounded-lg"
					src={
						img === undefined
							? 'https://loremflickr.com/500/500/animal'
							: img
					}
				/>
			</div>
			<div className="pl-6 flex flex-col h-full">
				<div className="flex flex-col">
					<span className="font-bold text-3xl leading-none text-blue-500">
						{name}
					</span>
					<span className="text-xl text-gray-500">
						Last updated {timeSince(new Date(lastUpdate))} ago
					</span>
				</div>
				<div className="flex h-full text-xl">
					<span className="self-end">Location</span>
					<span className="self-end px-3 text-gray-500">
						{location}
					</span>
					<span className="self-end pr-3">Quantity</span>
					<span className="self-end text-gray-500">{count}</span>
				</div>
			</div>
		</div>
	);
};

export default ItemComponent;
