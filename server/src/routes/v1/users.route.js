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

router
  .route('/:userId/kudos')
  .get(validate(userValidator.userId), authorize, userController.getKudos);

export default router;
