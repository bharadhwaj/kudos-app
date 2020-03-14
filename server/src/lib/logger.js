import httpContext from 'express-http-context';
import { wlogger } from './winston';

const formatMessage = function(message) {
  const reqId = httpContext.get('reqId');
  message = reqId ? `[reqId: ${reqId}] ${message}` : message;
  return message;
};

const myLogger = wlogger;
const logger = {
  log: function(level, message) {
    myLogger.log(level, formatMessage(message));
  },
  error: function(message) {
    myLogger.error(formatMessage(message));
  },
  warn: function(message) {
    myLogger.warn(formatMessage(message));
  },
  verbose: function(message) {
    myLogger.verbose(formatMessage(message));
  },
  info: function(message) {
    myLogger.info(formatMessage(message));
  },
  debug: function(message) {
    myLogger.debug(formatMessage(message));
  },
  silly: function(message) {
    myLogger.silly(formatMessage(message));
  },
};

export default logger;
