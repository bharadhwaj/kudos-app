import moment from 'moment-timezone';
import { Op } from 'sequelize';

import KudosModel from '../models/kudos.model';
import UserModel from '../models/users.model';

import logger from '../lib/logger';

export default class KudosClass {
  async addKudos(givenByUserId, receivedByUserId, comments) {
    try {
      logger.info(
        `KudosClass-addKudos - Given By: ${givenByUserId} - Received By: ${receivedByUserId} - Comments: ${comments}`
      );

      const kudos = await KudosModel.create({
        givenByUserId,
        receivedByUserId,
        comments,
      });

      logger.debug(`KudosClass-addKudos - Kudos: ${JSON.stringify(kudos)}`);

      return kudos;
    } catch (error) {
      logger.error(`ERROR: KudosClass-addKudos - ${error}`);
      throw error;
    }
  }

  async getKudosGivenByUserThisWeek(userId) {
    try {
      logger.info(
        `KudosClass-getKudosGivenByUserThisWeek - User ID: ${userId}`
      );

      const fromDate = moment().startOf('week');

      const kudos = await KudosModel.findAll({
        where: {
          givenByUserId: userId,
          createdAt: {
            [Op.gte]: fromDate,
          },
        },
        include: [
          {
            model: UserModel,
            as: 'receivedByUser',
            attributes: ['id', 'firstName', 'lastName', 'email'],
            raw: true,
          },
        ],
        attributes: {
          exclude: ['updatedAt', 'givenByUserId', 'receivedByUserId'],
        },
        raw: true,
        nest: true,
      });

      logger.debug(
        `KudosClass-getKudosGivenByUserThisWeek - Kudos: ${JSON.stringify(
          kudos
        )}`
      );

      return kudos;
    } catch (error) {
      logger.error(`ERROR: KudosClass-getKudosGivenByUserThisWeek - ${error}`);
      throw error;
    }
  }

  async getCurrentWeekKudosCountByUser(userId) {
    try {
      logger.info(
        `KudosClass-getCurrentWeekKudosCountByUser - User ID: ${userId}`
      );

      const fromDate = moment().startOf('week');

      const kudosCount = await KudosModel.count({
        where: {
          givenByUserId: userId,
          createdAt: {
            [Op.gte]: fromDate,
          },
        },
        raw: true,
      });

      logger.debug(
        `KudosClass-getCurrentWeekKudosCountByUser - Kudos Count: ${JSON.stringify(
          kudosCount
        )}`
      );

      return kudosCount;
    } catch (error) {
      logger.error(
        `ERROR: KudosClass-getCurrentWeekKudosCountByUser - ${error}`
      );
      throw error;
    }
  }

  async hasGivenKudosToThisUserThisWeek(givenByUserId, receivedByUserId) {
    try {
      logger.info(
        `KudosClass-hasGivenKudosToThisUserThisWeek - Given User ID: ${givenByUserId} - Received User ID: ${receivedByUserId}`
      );

      const fromDate = moment().startOf('week');

      const kudosCount = await KudosModel.count({
        where: {
          givenByUserId,
          receivedByUserId,
          createdAt: {
            [Op.gte]: fromDate,
          },
        },
        raw: true,
      });

      logger.debug(
        `KudosClass-hasGivenKudosToThisUserThisWeek - Kudos Count: ${JSON.stringify(
          kudosCount
        )}`
      );

      return kudosCount > 0 ? true : false;
    } catch (error) {
      logger.error(
        `ERROR: KudosClass-hasGivenKudosToThisUserThisWeek - ${error}`
      );
      throw error;
    }
  }
}
