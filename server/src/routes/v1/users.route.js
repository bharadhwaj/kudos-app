import express from 'express';

import authorize from '../../middleware/authorize';
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

router
  .route('/:userId/kudos')
  .post(validate(userValidator.giveKudos), authorize, userController.giveKudos);

export default router;
