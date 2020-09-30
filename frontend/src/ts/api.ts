export async function addItem(
	name: string,
	location: string,
	quantity: string,
	link: string,
	info: string,
	tags: string[],
) {
	const response = await fetch('http://localhost:8080/inventory/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, location, quantity, link, info, tags }),
	});

	return response.json();
}

export async function addTag(tag: string) {
	const response = await fetch('http://localhost:8080/tags/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name: tag }),
	});

	return response.json();
}

export async function getTags() {
	const response = await fetch('http://localhost:8080/tags');
	return response.json();
}
