import 'reflect-metadata';

import * as Koa from 'koa';

import errorHandler from '@middleware/errorHandler';
import * as bodyParser from 'koa-bodyparser';
import routes from './routes';

const app = new Koa();

app.use(bodyParser());
app.use(errorHandler);
app.use(routes.routes()).use(routes.allowedMethods()).use(routes.middleware());

export default app;
