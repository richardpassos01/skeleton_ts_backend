import 'reflect-metadata';

import container from '@dependencyInjectionContainer';
import errorHandler from '@middleware/errorHandler';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import {InversifyExpressServer} from 'inversify-express-utils';
import * as morgan from 'morgan';

export const PREFIX_API = '/api/v1';

export default new InversifyExpressServer(container, null, {
  rootPath: PREFIX_API,
})
  .setConfig((application: express.Application) => {
    application.use(express.json());
    application.get(
      '/healthy-check',
      (_req: express.Request, res: express.Response) =>
        res.status(StatusCodes.OK).send(ReasonPhrases.OK)
    );
  })
  .setErrorConfig((application: express.Application) =>
    application.use(errorHandler)
  );
