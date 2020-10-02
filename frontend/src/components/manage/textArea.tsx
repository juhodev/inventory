import * as React from 'react';
import { TextAreaComponentProps } from '../types';

const TextAreaComponent = (props: TextAreaComponentProps) => {
	const { title, placeholder, value, onChange } = props;

	return (
		<div className="flex flex-col font-body col-span-2">
			<span className="text-xl font-bold text-gray-200">{title}</span>
			<textarea
				className="border-0 border-b-2 border-indigo-600 p-2 bg-transparent text-gray-200 placeholder-gray-400"
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
