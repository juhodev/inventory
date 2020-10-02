import * as React from 'react';
import { Link } from 'react-router-dom';

const NavigationComponent = () => {
	const paths = [
		{ to: '/', name: 'Inventory' },
		{ to: '/manage', name: 'Manage' },
		{ to: '/metrics', name: 'Metrics' },
	];

	const { pathname } = window.location;

	const links = paths.map((path) => {
		let className = 'font-body text-4xl';

		if (pathname === path.to) {
			className += ' font-bold';
		}

		return (
			<Link key={path.name} className={className} to={path.to}>
				{path.name}
			</Link>
		);
	});

	return <div className="pl-12 pt-4 pb-8 bg-blue-100">{links}</div>;
};

export default NavigationComponent;
