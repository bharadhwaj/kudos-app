import { code, message } from '../constants';

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
  constructor(statusCode, responseCode, message, data = {}) {
    super(data);

    this.name = 'ApplicationError';
    this.statusCode = statusCode;
    this.responseCode = responseCode;
    this.message = message;
    this.error = data;
  }
}
