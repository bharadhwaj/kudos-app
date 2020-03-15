import OrganisationClass from '../classes/organisations.class';

import { utils } from '../constants';

import { ApplicationError } from '../lib/errors';
import logger from '../lib/logger';

export const getAllOrganisations = async (req, res, next) => {
  try {
    logger.info(
      `INFO: OrganisationController-getAllOrganisations - Offset & Limit: ${JSON.stringify(
        req.query
      )}`
    );
    const { offset, limit } = req.query;

    const organisationObject = new OrganisationClass();
    const {
      statusCode,
      response,
    } = await organisationObject.getAllOrganisations(+offset, +limit);

    res.status(statusCode).send(response);
  } catch (error) {
    logger.error(
      `ERROR: OrganisationController-getAllOrganisations - ${error}`
    );
    next(error);
  }
};
