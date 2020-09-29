import * as React from 'react';
import ManageSidebarComponent from './manageSidebar';

const ManageComponent = () => {
	return (
		<div>
			<ManageSidebarComponent onChange={(tab: string) => {}} />
		</div>
	);
};

export default ManageComponent;
