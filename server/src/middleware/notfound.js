import { code, message, utils } from '../constants';
import { ApplicationError } from '../lib/errors';

export const notfound = (req, res, next) => {
  next(
    new ApplicationError(
      code.APPLICATION_ERROR_STATUS_CODES.NOT_FOUND,
      code.APPLICATION_ERROR_CODES.NOT_FOUND,
      message.APPLICATION_ERROR_MESSAGES.NOT_FOUND
    )
  );
};
