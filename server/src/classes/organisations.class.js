import OrganisationModel from '../models/organisations.model';

import { code, message } from '../constants';
import logger from '../lib/logger';
import { ApplicationError } from '../lib/errors';

export default class OrganisationClass {
  async getOrganisationById(organisationId) {
    try {
      logger.info(
        `OrganisationClass-getOrganisationById - Organisation ID: ${organisationId}`
      );

      const organisation = await OrganisationModel.findOne({
        where: {
          id: organisationId,
          active: true,
        },
        raw: true,
      });

      logger.debug(
        `OrganisationClass-getAllOrganisations - Organisation: ${JSON.stringify(
          organisation
        )}`
      );

      if (!organisation) {
        throw new ApplicationError(
          409,
          code.ORGANISATION_FAILURE_CODES.ORGANISATION_NOT_FOUND,
          message.ORGANISATION_MESSAGES.ORGANISATION_NOT_FOUND,
          { organisationId }
        );
      }

      return organisation;
    } catch (error) {
      logger.error(`ERROR: OrganisationClass-getAllOrganisations - ${error}`);
      throw error;
    }
  }

  async getOrganisations(condition, offset = 0, limit = 100) {
    try {
      logger.info(
        `OrganisationClass-getAllOrganisations - Condition: ${JSON.stringify(
          condition
        )} - Offset: ${offset} - Limit: ${limit}`
      );

      const allOrganisations = await OrganisationModel.findAll({
        offset: +offset,
        limit: +limit,
        where: condition,
        raw: true,
      });

      logger.debug(
        `OrganisationClass-getAllOrganisations - All Organisations: ${JSON.stringify(
          allOrganisations
        )}`
      );

      return allOrganisations;
    } catch (error) {
      logger.error(`ERROR: OrganisationClass-getAllOrganisations - ${error}`);
      throw error;
    }
  }
}
