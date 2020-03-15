import OrganisationModel from '../models/organisations.model';

import { code, message } from '../constants';
import logger from '../lib/logger';

export default class OrganisationClass {
  async getAllOrganisations(offset = 0, limit = 100) {
    try {
      logger.info(
        `OrganisationClass-getAllOrganisations - Offset: ${offset} - Limit: ${limit}`
      );

      const allOrganisations = await OrganisationModel.findAll({
        where: {
          active: true,
        },
      });

      logger.debug(
        `OrganisationClass-getAllOrganisations - All Organisations: ${JSON.stringify(
          allOrganisations
        )}`
      );

      return {
        statusCode: 200,
        response: {
          success: true,
          responseCode: code.SUCCESS_CODES.GENERIC_SUCCESS,
          message: message.ORGANISATION_MESSAGES.FETCH_ALL_ORGANISATIONS,
          data: allOrganisations,
        },
      };
    } catch (error) {
      logger.error(`ERROR: OrganisationClass-getAllOrganisations - ${error}`);
      throw error;
    }
  }
}
