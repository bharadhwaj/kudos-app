import { code, message } from '../constants';

import { ApplicationError, InputValidationError } from '../lib/errors';
import logger from '../lib/logger';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof InputValidationError) {
    logger.error(`ERROR: InputValidationError - ${JSON.stringify(err.error)}`);

    const error = {
      success: false,
      responseCode: err.responseCode,
      message: err.message,
      data: { error: err.error },
    };

    res.status(err.statusCode).send(error);
    return;
  }

  if (err instanceof ApplicationError) {
    logger.error(`ERROR: ApplicationError - ${JSON.stringify(err.error)}`);

    const error = {
      success: false,
      responseCode: err.responseCode,
      message: err.message,
      data: { error: err.error },
    };

    res.status(err.statusCode).send(error);
    return;
  }

  logger.error(`ERROR: UncaughtError - ${JSON.stringify(err)}`);
  res.status(500).send({
    success: false,
    responseCode: code.APPLICATION_ERROR_CODES.INTERNAL_SERVER_ERROR,
    message: message.APPLICATION_ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    data: { error: err },
  });
};
