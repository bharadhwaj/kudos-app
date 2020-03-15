import express from 'express';

import validate from '../../middleware/validate';

import * as userController from '../../controllers/users.controller';
import * as userValidator from '../../validations/users.validation';

const router = express.Router();

router
  .route('/')
  .post(validate(userValidator.createUser), userController.signUp);

router
  .route('/login')
  .post(validate(userValidator.login), userController.login);

export default router;
