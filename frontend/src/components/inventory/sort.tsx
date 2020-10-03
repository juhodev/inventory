import * as React from 'react';
import { SortComponentProps, SortType } from '../types';

const SortComponent = (props: SortComponentProps) => {
	const { onChange } = props;

	return (
		<div className="flex flex-row font-body p-6 text-xl items-baseline">
			<label
				htmlFor="sort-by-select"
				className="pr-3 font-bold text-gray-200"
			>
				Sort by
			</label>
			<select
				id="sort-by-select"
				className="block appearance-none bg-gray-600 border-b-2 border-indigo-600 mt-1 p-2 rounded focus:outline-none text-gray-200"
				onChange={(e) => onChange(e.target.value as SortType)}
			>
				<option>{SortType.LAST_UPDATED}</option>
				<option>{SortType.NAME}</option>
				<option>{SortType.LOCATION}</option>
			</select>
		</div>
	);
};

export default SortComponent;
