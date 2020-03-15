import OrganisationModel from '../models/organisations.model';
import UserModel from '../models/users.model';

import { code, message } from '../constants';

import { ApplicationError } from '../lib/errors';
import logger from '../lib/logger';

export default class UserClass {
  async createUser(userInfo) {
    try {
      logger.info(
        `UserClass-createUser - User Info: ${JSON.stringify(userInfo)}`
      );

      const newUser = await UserModel.create(userInfo);

      const { password, ...user } = newUser.get({ plain: true });

      logger.debug(`UserClass-createUser - User: ${JSON.stringify(user)}`);

      return user;
    } catch (error) {
      logger.error(`ERROR: UserClass-createUser - ${error}`);
      throw error;
    }
  }

  async getUsers(
    condition = { active: true },
    { offset = 0, limit = 1, excludeFields = [] } = {}
  ) {
    try {
      logger.info(
        `UserClass-getUsers - Condition: ${JSON.stringify(
          condition
        )} - Offset: ${offset} - Limit: ${limit}`
      );

      const users = await UserModel.findAll({
        attributes: { exclude: excludeFields },
        offset: +offset,
        limit: +limit,
        where: condition,
        include: [
          {
            model: OrganisationModel,
            as: 'organisation',
            attributes: ['id', 'name'],
            raw: true,
          },
        ],
        raw: true,
        nest: true,
      });

      logger.debug(`UserClass-getUsers - Users: ${JSON.stringify(users)}`);

      return users;
    } catch (error) {
      logger.error(`ERROR: UserClass-getUsers - ${error}`);
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      logger.info(`UserClass-getUserById - User ID: ${userId}`);

      const user = await UserModel.findOne({
        where: { id: userId, active: true },
        raw: true,
      });

      logger.debug(`UserClass-getUserById - User: ${JSON.stringify(user)}`);

      if (!user) {
        throw new ApplicationError(
          409,
          code.USER_FAILURE_CODES.USER_NOT_FOUND,
          message.USER_MESSAGES.USER_NOT_FOUND,
          { userId }
        );
      }

      return user;
    } catch (error) {
      logger.error(`ERROR: UserClass-getUserById - ${error}`);
      throw error;
    }
  }
}
