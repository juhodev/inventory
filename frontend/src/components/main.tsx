import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import '../scss/main.scss';
import InventoryComponent from './inventory/inventory';
import ManageComponent from './manage/manage';
import NavigationComponent from './navigation';

const Main = () => {
	return (
		<Router>
			<NavigationComponent />
			<Route path="/" exact component={InventoryComponent} />
			<Route path="/manage" component={ManageComponent} />
		</Router>
	);
};

export default Main;
