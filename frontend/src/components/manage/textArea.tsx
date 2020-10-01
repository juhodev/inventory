import * as React from 'react';
import { TextAreaComponentProps } from '../types';

const TextAreaComponent = (props: TextAreaComponentProps) => {
	const { title, placeholder, value, onChange } = props;

	return (
		<div className="flex flex-col font-body col-span-2">
			<span className="text-xl font-bold">{title}</span>
			<textarea
				className="border border-gray-400 rounded w-full p-2 bg-gray-100"
				placeholder={placeholder}
				value={value}
				onChange={(e) => {
					onChange(e.target.value);
				}}
			/>
		</div>
	);
};

export default TextAreaComponent;
