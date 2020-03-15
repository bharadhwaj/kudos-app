import OrganisationClass from '../classes/organisations.class';
import UserClass from '../classes/users.class';

import { code, message } from '../constants';

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
    const organisations = await organisationObject.getOrganisations(
      { active: true },
      offset,
      limit
    );

    res.status(200).send({
      success: true,
      responseCode: code.SUCCESS_CODES.GENERIC_SUCCESS,
      message: message.ORGANISATION_MESSAGES.FETCH_ALL_ORGANISATIONS,
      data: { organisations },
    });
  } catch (error) {
    logger.error(
      `ERROR: OrganisationController-getAllOrganisations - ${error}`
    );
    next(error);
  }
};

export const getUsersFromOrganisation = async (req, res, next) => {
  try {
    logger.info(
      `INFO: OrganisationController-getUsersFromOrganisation - Organisation ID: ${JSON.stringify(
        req.params.organisationId
      )} - Limit & Offset: ${JSON.stringify(req.query)}`
    );

    const { organisationId } = req.params;
    const { offset, limit } = req.query;

    const userObject = new UserClass();
    const organisationObject = new OrganisationClass();

    await organisationObject.getOrganisationById(organisationId);

    const users = await userObject.getUsers(
      { organisationId, active: true },
      { offset, limit: limit || 100, excludeFields: ['password', 'active'] }
    );

    res.status(200).send({
      success: true,
      responseCode: code.SUCCESS_CODES.GENERIC_SUCCESS,
      message: message.USER_MESSAGES.GET_USERS_BY_ORGANISATION,
      data: { users },
    });
  } catch (error) {
    logger.error(
      `ERROR: OrganisationController-getUsersFromOrganisation - ${error}`
    );
    next(error);
  }
};
