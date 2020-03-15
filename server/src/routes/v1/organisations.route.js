import express from 'express';

import authorize from '../../middleware/authorize';
import validate from '../../middleware/validate';

import * as organisationController from '../../controllers/organisations.controller';
import * as organisationValidator from '../../validations/organisations.validation';

const router = express.Router();

router
  .route('/')
  .get(
    validate(organisationValidator.limitAndOffset),
    authorize,
    organisationController.getAllOrganisations
  );

router
  .route('/:organisationId/users')
  .get(
    validate(organisationValidator.getOrganisationUsers),
    authorize,
    organisationController.getUsersFromOrganisation
  );

export default router;
