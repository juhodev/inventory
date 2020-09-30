import expressPromiseRouter from 'express-promise-router';
import { itemManager } from '../index';
const router = expressPromiseRouter();

import { ItemInventoryResponse } from '../inventory/types';

router.get('/', (req, res) => {
	res.json({ error: false, inventory: itemManager.getInventory().getAll() });
});

router.post('/add', (req, res) => {
	const { body } = req;
	const { name, info, location, img, count, link, tags } = body;

	const response: ItemInventoryResponse = itemManager
		.getInventory()
		.add(name, info, location, img, count, link, tags);

	res.json(response);
});

export default router;
