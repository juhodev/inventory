import * as React from 'react';
import { SortComponentProps, SortType } from './types';

const SortComponent = (props: SortComponentProps) => {
	const { onChange } = props;

	return (
		<div className="flex flex-row font-body p-6 text-xl">
			<label htmlFor="sort-by-select" className="pr-3 text-gray-500">Sort by</label>
			<select
				id="sort-by-select"
				className="block appearance-none bg-white border-0 font-bold focus:outline-none"
				onChange={(e) => onChange(e.target.value as SortType)}
			>
				<option>{SortType.LAST_UPDATED}</option>
			</select>
		</div>
	);
};

export default SortComponent;
