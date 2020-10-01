import expressPromiseRouter from 'express-promise-router';
import { itemManager } from '..';
import { TagResponse } from '../inventory/types';
const router = expressPromiseRouter();

router.get('/', (req, res) => {
	res.json({ error: false, tags: itemManager.getTags().getAll() });
});

router.post('/add', (req, res) => {
	const { body } = req;
	const { name } = body;

	const response: TagResponse = itemManager.getTags().add(name);

	res.json(response);
});

export default router;
