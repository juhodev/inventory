import * as React from 'react';
import { SearchComponentProps } from '../types';

const SearchComponent = (props: SearchComponentProps) => {
	const { onChange, value } = props;

	return (
		<div className="flex flex-grow justify-center">
			<input
				className="border border-blue-800 h-10 p-2 font-body rounded w-80 bg-blue-500 text-gray-200"
				placeholder="Search..."
				value={value}
				onChange={(e) => {
					onChange(e.target.value);
				}}
			/>
		</div>
	);
};

export default SearchComponent;
