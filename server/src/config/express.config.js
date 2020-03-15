import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import httpContext from 'express-http-context';
import randomstring from 'randomstring';

import { env } from './env.config';

import { utils } from '../constants';

import { errorHandler } from '../middleware/errorHandler';
import {
  morganAccessLogger,
  morganStdErr,
  morganStdOut,
} from '../middleware/morgan';

import createRouter from '../router';

const app = express();

app.use(cors({ origin: '*' }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(helmet());

app.use(httpContext.middleware);
app.use(function(req, res, next) {
  let id = randomstring.generate();
  httpContext.set('reqId', id);
  req.id = id;
  next();
});

if (env !== utils.ENV.TEST) {
  app.use(morganAccessLogger);
}

if (env === utils.ENV.TEST || env === utils.ENV.DEV) {
  app.use(morganStdErr);
  app.use(morganStdOut);
}

app.use('/', createRouter());

app.use(errorHandler);

export default app;
