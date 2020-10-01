import * as React from 'react';
import { TextInputComponentProps } from '../types';

const TextInputComponent = (props: TextInputComponentProps) => {
	const { title, placeholder, onChange, value } = props;

	return (
		<div className="flex flex-col font-body">
			<span className="text-xl font-bold">{title}</span>
			<input
				className="border border-gray-400 rounded w-80 p-2 bg-gray-100"
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
