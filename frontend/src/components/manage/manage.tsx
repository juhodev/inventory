import * as React from 'react';
import EditItemComponent from './editItem';
import ManageSidebarComponent from './manageSidebar';
import NewItemComponent from './newItem';

const { useState } = React;

const ManageComponent = () => {
	const [currentTab, setCurrentTab] = useState('New');

	let tabToRender: JSX.Element;

	switch (currentTab) {
		case 'New':
			tabToRender = <NewItemComponent />;
			break;

		case 'Edit':
			tabToRender = <EditItemComponent />;
			break;
	}

	return (
		<div className="flex flex-row">
			<ManageSidebarComponent
				onChange={(tab: string) => {
					setCurrentTab(tab);
				}}
			/>
			{tabToRender}
		</div>
	);
};

export default ManageComponent;
