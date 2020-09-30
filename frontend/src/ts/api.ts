export default async function addItem(
	name: string,
	location: string,
	quantity: string,
	link: string,
	info: string,
) {
	const response = await fetch('http://localhost:8080/inventory/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, location, quantity, link, info }),
	});

	return response.json();
}
