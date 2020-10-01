import * as React from 'react';
import { timeSince } from '../../utils/timeUtils';
import { ItemInfoComponentProps } from '../types';

const ItemInfoComponent = (props: ItemInfoComponentProps) => {
	const { item } = props;
	const { name, count, info, location, img, link, lastUpdate } = item;

	const nameClassName: string =
		link === ''
			? 'font-bold text-3xl leading-none text-blue-500'
			: 'font-bold text-3xl leading-none text-blue-500 cursor-pointer';

	const openItemLink = () => {
		if (link !== '') {
			window.open(link, '_blank');
		}
	};

	return (
		<div className="container flex flex-col w-1/1.5 font-body items-center">
			<div className="shadow border-indigo-600 w-102 rounded-lg">
				<div className="flex justify-center items-center w-full h-64 overflow-hidden rounded-t-lg">
					<img
						src={
							img === undefined
								? 'https://loremflickr.com/500/500/animal'
								: img
						}
					/>
				</div>
				<div className="p-6 bg-blue-50">
					<div className="flex flex-col pb-3">
						<span className={nameClassName} onClick={openItemLink}>
							{name}
						</span>
						<span className="text-xl text-gray-500">
							Last updated {timeSince(new Date(lastUpdate))} ago
						</span>
					</div>
					<span className="text-lg">{info}</span>
					<div className="flex flex-row w-full justify-between pt-12">
						<div className="flex flex-col">
							<span className="text-xl leading-none">
								Location
							</span>
							<span className="text-gray-500 text-2xl">
								{location}
							</span>
						</div>
						<div className="flex flex-col">
							<span className="text-xl leading-none">
								Quantity
							</span>
							<span className="text-gray-500 text-2xl">
								{count}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ItemInfoComponent;
