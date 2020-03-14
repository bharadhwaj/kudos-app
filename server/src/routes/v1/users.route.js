import express from 'express';

import validate from '../../middleware/validate';

import * as controller from '../../controllers/users.controller';
import * as validator from '../../validations/users.validation';

const router = express.Router();

router.route('/').post(validate(validator.createUser), controller.createUser);

export default router;
