import express from 'express';

import validate from '../../middleware/validate';

import * as organisationController from '../../controllers/organisations.controller';
import * as organisationValidator from '../../validations/users.validation';

const router = express.Router();

router.route('/').get(organisationController.getAllOrganisations);

export default router;
