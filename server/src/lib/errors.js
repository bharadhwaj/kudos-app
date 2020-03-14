import { code, message, utils } from '../constants';
import response from './response';

export class InputValidationError extends Error {
  constructor(data) {
    super(data);
    this.name = 'InputValidationError';
    this.statusCode = 422;
    this.responseCode = code.APPLICATION_ERROR_CODES.MISSING_PARAMS;
    this.message = message.APPLICATION_ERROR_MESSAGES.MISSING_PARAMS;
    this.error = data;
  }
}

export class ApplicationError extends Error {
  constructor(statusCode, errorIdentifier, data) {
    super(response.APPLICATION_ERROR[errorIdentifier].message);

    if (!errorIdentifier || !statusCode) {
      throw new Error('Error: errorIdentifier and statusCode must be provided');
    }

    if (statusCode < 400 || statusCode >= 600) {
      throw new Error(
        'statusCode must be a number between 400 and 599 inclusive'
      );
    }

    this.name = 'ApplicationError';
    this.statusCode = code.APPLICATION_ERROR_STATUS_CODES[errorIdentifier];
    this.responseCode = code.APPLICATION_ERROR_CODES[errorIdentifier];
    this.message = message.APPLICATION_ERROR_MESSAGES[errorIdentifier];
    this.error = data || {};
  }
}
