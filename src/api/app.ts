import 'reflect-metadata';

import * as express from 'express';

import {TYPES} from '@constants/types';
import container from '@dependencyInjectionContainer';
import Database from '@infrastructure/database';
import errorHandler from '@middleware/errorHandler';
import routes, {PREFIX_API} from './routes';

const app = express();
app.use(express.json());
app.use(routes);
app.use(PREFIX_API, routes);
app.use(errorHandler);

(() => {
  const database = container.get<Database>(TYPES.Database);
  database.checkConnection();
})();

export default app;
