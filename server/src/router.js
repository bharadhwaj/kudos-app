import express from 'express';
import path from 'path';
import v1Routes from './routes/v1';

import { uncached } from './middleware/uncached';
import { errorHandler } from './middleware/errorHandler';
import { notfound } from './middleware/notfound';

export default function createRouter() {
  const router = express.Router();

  router.use('/docs', express.static(path.join(__dirname, '..', 'docs')));

  /**
   * Uncached routes:
   * All routes that shouldn't be cached (i.e. non-static assets)
   * should have these headers to prevent 304 Unmodified cache
   * returns. This middleware applies it to all subsequently
   * defined routes.
   */
  router.get('/*', uncached);

  //all v1 routes
  router.use('/v1', v1Routes);

  //handle 404
  router.all('/*', notfound);

  // catch all errors
  router.use(errorHandler);

  return router;
}
