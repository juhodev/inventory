import * as React from 'react';
import { TextAreaComponentProps } from '../types';

const { useState } = React;

const TextAreaComponent = (props: TextAreaComponentProps) => {
	const [text, setText] = useState('');
	const { title, placeholder, onChange } = props;

	return (
		<div className="flex flex-col font-body col-span-2">
			<span className="text-xl font-bold">{title}</span>
			<textarea
				className="border border-gray-400 rounded w-full p-2 bg-gray-100"
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

export default TextAreaComponent;
