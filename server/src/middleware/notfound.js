import { code, utils } from '../constants';
import { ApplicationError } from '../lib/errors';

export const notfound = (req, res, next) => {
  next(
    new ApplicationError(
      code.APPLICATION_ERROR_STATUS_CODES.NOT_FOUND,
      utils.ERROR_IDENTIFIERS.NOT_FOUND
    )
  );
};
