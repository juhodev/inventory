import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import '../scss/main.scss';
import InventoryComponent from './inventory/inventory';
import ManageComponent from './manage/manage';
import MetricsComponent from './metrics/metrics';
import NavigationComponent from './navigation';

const Main = () => {
	return (
		<Router>
			<NavigationComponent />
			<Route path="/" exact component={InventoryComponent} />
			<Route path="/manage" component={ManageComponent} />
			<Route path="/metrics" component={MetricsComponent} />
		</Router>
	);
};

export default Main;
