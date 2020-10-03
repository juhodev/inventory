import * as React from 'react';
import { SearchComponentProps } from '../types';

const SearchComponent = (props: SearchComponentProps) => {
	const { onChange, value } = props;

	return (
		<div className="flex flex-grow justify-center">
			<input
				className="border-b-2 border-indigo-600 bg-transparent h-10 p-2 font-body w-80 text-gray-200"
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
