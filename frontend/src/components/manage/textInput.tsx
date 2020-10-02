import * as React from 'react';
import { TextInputComponentProps } from '../types';

const TextInputComponent = (props: TextInputComponentProps) => {
	const { title, placeholder, onChange, value } = props;

	return (
		<div className="flex flex-col font-body">
			<span className="text-xl font-bold text-gray-200">{title}</span>
			<input
				className="border-0 border-b-2 border-indigo-600 w-80 mt-1 text-gray-200 placeholder-gray-400 h-12 bg-transparent"
				placeholder={placeholder}
				value={value}
				onChange={(e) => {
					onChange(e.target.value);
				}}
			/>
		</div>
	);
};

export default TextInputComponent;
