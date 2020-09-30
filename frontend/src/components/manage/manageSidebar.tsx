import * as React from 'react';
import { ManageSidebarComponentProps } from '../types';

const { useState } = React;

const ManageSidebarComponent = (props: ManageSidebarComponentProps) => {
	const [currentTab, setCurrentTab] = useState('New');
	const { onChange } = props;

	const tabs = ['New', 'Edit'];

	const tabComponents: JSX.Element[] = tabs.map((tab) => {
		let className = 'text-lg cursor-pointer mb-3';

		if (currentTab === tab) {
			className += ' font-bold';
		}

		return (
			<span
				key={tab}
				className={className}
				onClick={() => {
					setCurrentTab(tab);
					onChange(tab);
				}}
			>
				{tab}
			</span>
		);
	});

	return (
		<div className="h-full font-body flex flex-col pl-6 pt-12">
			{tabComponents}
		</div>
	);
};

export default ManageSidebarComponent;
