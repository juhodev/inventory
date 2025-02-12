import * as React from 'react';
import { timeSince } from '../../utils/timeUtils';
import { SmallItemComponentProps } from '../types';

const SmallItemComponent = (props: SmallItemComponentProps) => {
	const { item, onClick } = props;

	const { img, name, lastUpdate, tags } = item;

	const tagComponents =
		// This is a quick fix please fix this later
		tags === undefined
			? []
			: tags.map((tag) => (
					<div className="">
						<span
							key={tag}
							className="text-xs py-1 px-3 m-1 h-6 rounded-full font-bold bg-blue-500 text-gray-300"
						>
							{tag}
						</span>
					</div>
			  ));

	return (
		<div
			className="container flex flex-row h-24 px-2 p-3 border-b-2 border-indigo-600 font-body cursor-pointer"
			onClick={onClick}
		>
			<div className="flex justify-center items-center w-12 h-12">
				<img
					className="max-w-12 rounded-lg"
					src={
						img === undefined
							? 'https://loremflickr.com/500/500/animal'
							: img
					}
				/>
			</div>
			<div className="pl-3 flex flex-col h-full">
				<div className="flex flex-col w-full">
					<span className="font-bold text-xl leading-none text-blue-500">
						{name}
					</span>
					<span className="text-lg text-gray-500">
						Last updated {timeSince(new Date(lastUpdate))} ago
					</span>
				</div>
			</div>
			<div className="flex flex-grow flex-wrap justify-end">
				{tagComponents}
			</div>
		</div>
	);
};

export default SmallItemComponent;
