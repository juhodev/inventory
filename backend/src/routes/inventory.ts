import expressPromiseRouter from 'express-promise-router';
const router = expressPromiseRouter();

import ItemInventory from '../inventory/itemInventory';
import { ItemInventoryResponse } from '../inventory/types';
const inventory = new ItemInventory();
inventory.load();

router.get('/', (req, res) => {
	res.json({ error: false, inventory: inventory.getAll() });
});

router.post('/add', (req, res) => {
	const request = JSON.parse(req.body);
	const { name, info, location, img, count } = request;

	const response: ItemInventoryResponse = inventory.add(
		name,
		info,
		location,
		img,
		count,
	);

	res.json(response);
});

export default router;
