import UserModel from '../models/users.model';

import { code, message } from '../constants';
import logger from '../lib/logger';

export default class UserClass {
  async createUser(userInfo) {
    try {
      logger.info(
        `UserClass-createUser - User Info: ${JSON.stringify(userInfo)}`
      );

      const existingUser = await UserModel.findOne({
        where: {
          email: userInfo.email,
        },
      });

      logger.debug(
        `UserClass-createUser - Existing User: ${JSON.stringify(existingUser)}`
      );

      if (existingUser) {
        return {
          statusCode: 409,
          response: {
            success: false,
            responseCode: code.USER_FAILURE_CODES.USER_ALREADY_EXISTS,
            message: message.USER_MESSAGES.USER_ALREADY_EXISTS,
            data: { email: userInfo.email },
          },
        };
      }

      const newUser = await UserModel.create(userInfo);

      const { password, ...user } = newUser.get({ plain: true });

      logger.debug(`UserClass-createUser - User: ${JSON.stringify(user)}`);

      return {
        statusCode: 201,
        response: {
          success: true,
          responseCode: code.SUCCESS_CODES.GENERIC_SUCCESS,
          message: message.USER_MESSAGES.CREATE_USER_SUCCESS,
          data: user,
        },
      };
    } catch (error) {
      logger.error(`ERROR: UserClass-createUser - ${error}`);
      throw error;
    }
  }
}
