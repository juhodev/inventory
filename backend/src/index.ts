import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import InventoryRouter from './routes/inventoryRoute';
import TagsRouter from './routes/tagsRoute';
import MetricsRouter from './routes/metricsRoute';

import ItemManager from './itemManager';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
	console.log(`Request ${req.url}`);
	next();
});

const itemManager = new ItemManager();
itemManager.load();

app.use('/inventory', InventoryRouter);
app.use('/tags', TagsRouter);
app.use('/metrics', MetricsRouter);

const HTTP_PORT = 8080;

app.listen(HTTP_PORT, () => {
	console.log(`Listening on port ${HTTP_PORT}`);
});

export { itemManager };
