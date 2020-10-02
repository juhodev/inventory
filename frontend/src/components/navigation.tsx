import * as React from 'react';
import { Link } from 'react-router-dom';

const { useState } = React;

const NavigationComponent = () => {
	const [currentTab, setCurrentTab] = useState(window.location.pathname);

	const paths = [
		{ to: '/', name: 'Inventory' },
		{ to: '/manage', name: 'Manage' },
		{ to: '/metrics', name: 'Metrics' },
	];

	const links = paths.map((path) => {
		let className = 'font-body px-5 text-4xl';

		if (currentTab === path.to) {
			className += ' font-bold text-blue-500';
		} else {
			className += ' text-gray-200';
		}

		return (
			<Link
				key={path.name}
				className={className}
				to={path.to}
				onClick={() => setCurrentTab(path.to)}
			>
				{path.name}
			</Link>
		);
	});

	return <div className="pl-12 pt-4 pb-8 bg-gray-800">{links}</div>;
};

export default NavigationComponent;
