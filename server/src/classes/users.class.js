import { compareSync } from 'bcryptjs';

import UserModel from '../models/users.model';
import OrganisationModel from '../models/organisations.model';

import { code, message } from '../constants';

import { ApplicationError } from '../lib/errors';
import logger from '../lib/logger';
import { generateToken } from '../lib/token';

export default class UserClass {
  async signUp(userInfo) {
    try {
      logger.info(`UserClass-signUp - User Info: ${JSON.stringify(userInfo)}`);

      const existingUser = await UserModel.findOne({
        where: {
          email: userInfo.email,
          active: true,
        },
      });

      logger.debug(
        `UserClass-signUp - Existing User: ${JSON.stringify(existingUser)}`
      );

      if (existingUser) {
        throw new ApplicationError(
          409,
          code.USER_FAILURE_CODES.USER_ALREADY_EXISTS,
          message.USER_MESSAGES.USER_ALREADY_EXISTS,
          { email: userInfo.email }
        );
      }

      const organisation = await OrganisationModel.findOne({
        where: {
          id: userInfo.organisationId,
          active: true,
        },
      });

      logger.debug(
        `UserClass-signUp - Existing organisation: ${JSON.stringify(
          organisation
        )}`
      );

      if (!organisation) {
        throw new ApplicationError(
          409,
          code.ORGANISATION_FAILURE_CODES.ORGANISATION_NOT_FOUND,
          message.ORGANISATION_MESSAGES.ORGANISATION_NOT_FOUND,
          { organisationId: userInfo.organisationId }
        );
      }

      const newUser = await UserModel.create(userInfo);

      const { password, ...user } = newUser.get({ plain: true });

      logger.debug(`UserClass-signUp - User: ${JSON.stringify(user)}`);

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
      logger.error(`ERROR: UserClass-signUp - ${error}`);
      throw error;
    }
  }

  async login(email, password) {
    try {
      logger.info(`UserClass-login - email: ${email}`);

      const userDetails = await UserModel.findOne({
        where: {
          email,
          active: true,
        },
      });

      logger.debug(
        `UserClass-login - User Details: ${JSON.stringify(userDetails)}`
      );

      if (!userDetails) {
        throw new ApplicationError(
          400,
          code.USER_FAILURE_CODES.USER_NOT_FOUND,
          message.USER_MESSAGES.USER_NOT_FOUND,
          { email }
        );
      }

      const isAuthenticated = compareSync(password, userDetails.password);

      if (!isAuthenticated) {
        throw new ApplicationError(
          401,
          code.USER_FAILURE_CODES.INVALID_LOGIN,
          message.USER_MESSAGES.INVALID_LOGIN,
          { email }
        );
      }

      const { password: passwordHash, ...user } = userDetails;

      user.token = await generateToken(user.id);

      logger.debug(`UserClass-login - User: ${JSON.stringify(user)}`);

      return {
        statusCode: 200,
        response: {
          success: true,
          responseCode: code.SUCCESS_CODES.GENERIC_SUCCESS,
          message: message.USER_MESSAGES.LOGIN_SUCCESS,
          data: user,
        },
      };
    } catch (error) {
      logger.error(`ERROR: UserClass-login - ${error}`);
      throw error;
    }
  }
}
