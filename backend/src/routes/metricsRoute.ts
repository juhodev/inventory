import expressPromiseRouter from 'express-promise-router';
import { itemManager } from '../index';

const router = expressPromiseRouter();

router.get('/', (req, res) => {
	res.json({
		error: false,
		itemCountHistory: itemManager.getItemHistory().getAll(),
	});
});

export default router;