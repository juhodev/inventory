import * as React from 'react';
import { SortComponentProps, SortType } from '../types';

const SortComponent = (props: SortComponentProps) => {
	const { onChange } = props;

	return (
		<div className="flex flex-row font-body p-6 text-xl">
			<label
				htmlFor="sort-by-select"
				className="pr-3 font-bold text-gray-200"
			>
				Sort by
			</label>
			<select
				id="sort-by-select"
				className="block bg-transparent appearance-none border-0 focus:outline-none text-blue-500"
				onChange={(e) => onChange(e.target.value as SortType)}
			>
				<option>{SortType.LAST_UPDATED}</option>
				<option>{SortType.NAME}</option>
			</select>
		</div>
	);
};

export default SortComponent;
