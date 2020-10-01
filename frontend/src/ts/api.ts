export async function addItem(
	name: string,
	location: string,
	quantity: string,
	link: string,
	info: string,
	tags: string[],
) {
	const response = await fetch(`${getURL()}/inventory/add`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, location, quantity, link, info, tags }),
	});

	return response.json();
}

export async function addTag(tag: string) {
	const response = await fetch(`${getURL()}/tags/add`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name: tag }),
	});

	return response.json();
}

export async function getTags() {
	const response = await fetch(`${getURL()}/tags`);
	return response.json();
}

export async function getInventory() {
	const response = await fetch(`${getURL()}/inventory`);
	return response.json();
}

function getURL() {
	return `http://${window.location.hostname}:8080`;
}
