import * as express from 'express';
import * as cors from 'cors';
import * as compression from 'compression';
import * as morgan from 'morgan';
import routes from './routes';
import errorHandler from '../middleware/errorHandler';

const PREFIX = '/skeleton';
const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(morgan('combined'));

app.use(PREFIX, routes);
app.use(errorHandler);

export default app;
