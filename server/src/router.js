import express from 'express';
import path from 'path';
import v1Routes from './routes/v1';

import { uncached } from './middleware/uncached';
import { notfound } from './middleware/notfound';

export default function createRouter() {
  const router = express.Router();

  router.get('/*', uncached);

  router.use('/v1', v1Routes);

  router.all('/*', notfound);

  return router;
}
