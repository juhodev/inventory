import { EditItem, NewItem } from '../components/types';

export async function addItem(item: NewItem) {
	const response = await fetch(`${getURL()}/inventory/add`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(item),
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

export async function updateItem(item: EditItem) {
	const response = await fetch(`${getURL()}/inventory/updateItem`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(item),
	});

	return response.json();
}

export async function getMetrics() {
	return await (await fetch(`${getURL()}/metrics`)).json();
}

function getURL() {
	return `http://${window.location.hostname}:8080`;
}
