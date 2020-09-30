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
	const { body } = req;
	const { name, info, location, img, count, link } = body;

	const response: ItemInventoryResponse = inventory.add(
		name,
		info,
		location,
		img,
		count,
		link,
	);

	res.json(response);
});

export default router;
