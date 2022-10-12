import 'reflect-metadata';

import * as Koa from 'koa';

import {TYPES} from '@constants/types';
import container from '@dependencyInjectionContainer';
import Database from '@infrastructure/database';
import errorHandler from '@middleware/errorHandler';
import * as bodyParser from 'koa-bodyparser';
import routes from './routes';

const app = new Koa();

(function () {
  const database = container.get<Database>(TYPES.Database);
  database.checkConnection();
  database.createIndexes();
})();

app.use(bodyParser());
app.use(errorHandler);
app.use(routes.routes()).use(routes.allowedMethods()).use(routes.middleware());

export default app;
