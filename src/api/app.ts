import 'reflect-metadata';
import {InversifyExpressServer} from 'inversify-express-utils';
import * as express from 'express';
import * as cors from 'cors';
import * as compression from 'compression';
import * as morgan from 'morgan';
import container from '../DependencyInjectionContainer';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';
import errorHandler from '../middleware/errorHandler';

export default new InversifyExpressServer(container, null, {
  rootPath: '/api/v1',
})
  .setConfig((application: express.Application) => {
    application.use(cors());
    application.use(express.json());
    application.use(compression());
    application.use(morgan('combined'));
    application.get(
      '/healthy-check',
      (_req: express.Request, res: express.Response) =>
        res.status(StatusCodes.OK).send(ReasonPhrases.OK)
    );
  })
  .setErrorConfig((application: express.Application) =>
    application.use(errorHandler)
  );
