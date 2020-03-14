import logger from './logger';
import appServer from '../index';

export default function shutDown() {
  logger.error('Initiating Shut down');
  if (appServer) {
    appServer.close(() => {
      logger.error('Stop accepting new connections ');
      process.exit(0);
    });
    setTimeout(() => {
      logger.error('Forcefully shutting down');
      process.exit(1);
    }, 10000);
  } else {
    logger.error('No app server running. Exiting process');
    process.exit(0);
  }
}
