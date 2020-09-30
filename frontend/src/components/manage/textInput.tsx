import * as React from 'react';
import { TextInputComponentProps } from '../types';

const { useState } = React;

const TextInputComponent = (props: TextInputComponentProps) => {
	const [text, setText] = useState('');
	const { title, placeholder, onChange } = props;

	return (
		<div className="flex flex-col font-body">
			<span className="text-xl font-bold">{title}</span>
			<input
				className="border border-gray-400 rounded w-80 p-2 bg-gray-100"
				placeholder={placeholder}
				value={text}
				onChange={(e) => {
					const { value } = e.target;
					setText(value);
					onChange(value);
				}}
			/>
		</div>
	);
};

export default TextInputComponent;
