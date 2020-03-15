import '@babel/polyfill';
import http from 'http';

import app from './config/express.config';
import { env, serverConfig } from './config';

import { utils } from './constants';

import validateInit from './lib/sanity';
import logger from './lib/logger';
import connectSequelize from './lib/sequelize';
import shutDown from './lib/shutdown';
import addOrganisationData from './utils/organisations';
import addUserData from './utils/users';

if (!validateInit()) {
  shutDown();
}

const appServer = http.createServer(app);

appServer.listen(serverConfig.port, async () => {
  logger.info(`Listening on port ${serverConfig.port} Environment: ${env}`);
  await connectSequelize();
  if (env === utils.ENV.DEV) {
    await addOrganisationData();
    await addUserData();
  }
});

process.on('SIGINT', shutDown);
process.on('SIGTERM', shutDown);

export default appServer;
