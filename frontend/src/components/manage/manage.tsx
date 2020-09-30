import * as React from 'react';
import ManageSidebarComponent from './manageSidebar';
import NewItemComponent from './newItem';

const ManageComponent = () => {
	return (
		<div className="flex flex-row">
			<ManageSidebarComponent onChange={(tab: string) => {}} />
            <NewItemComponent />
		</div>
	);
};

export default ManageComponent;
