import { InputValidationError } from '../lib/errors';

const validate = schema => {
  return function(req, res, next) {
    const request = {
      body: req.body,
      params: req.params,
      query: req.query,
    };

    const { error } = schema.validate(request);
    if (error) {
      next(new InputValidationError(error.details));
    } else {
      next();
    }
  };
};

export default validate;
