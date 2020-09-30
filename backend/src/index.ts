import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import InventoryRouter from './routes/inventory';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
	console.log(`Request ${req.url}`);
	next();
});

app.use('/inventory', InventoryRouter);

const HTTP_PORT = 8080;

app.listen(HTTP_PORT, () => {
	console.log(`Listening on port ${HTTP_PORT}`);
});
