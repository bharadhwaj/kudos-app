import { hashSync, compareSync } from 'bcryptjs';

import OrganisationClass from '../classes/organisations.class';
import UserClass from '../classes/users.class';

import { code, message, utils } from '../constants';

import { ApplicationError } from '../lib/errors';
import logger from '../lib/logger';
import { generateToken } from '../lib/token';

export const signUp = async (req, res, next) => {
  try {
    logger.info(`INFO: UserController-signUp - User Email: ${req.body.email}`);
    const { password, ...userInfo } = req.body;

    const userObject = new UserClass();
    const organisationObject = new OrganisationClass();

    const [existingUser] = await userObject.getUsers(
      {
        email: userInfo.email,
        active: true,
      },
      { excludeFields: ['password'] }
    );

    if (existingUser) {
      throw new ApplicationError(
        409,
        code.USER_FAILURE_CODES.USER_ALREADY_EXISTS,
        message.USER_MESSAGES.USER_ALREADY_EXISTS,
        { email: userInfo.email }
      );
    }

    await organisationObject.getOrganisationById(userInfo.organisationId);

    userInfo.password = hashSync(password, utils.SALT_ROUND);

    const user = await userObject.createUser(userInfo);

    user.token = await generateToken(user.id);

    res.status(201).send({
      success: true,
      responseCode: code.SUCCESS_CODES.GENERIC_SUCCESS,
      message: message.USER_MESSAGES.CREATE_USER_SUCCESS,
      data: { user },
    });
  } catch (error) {
    logger.error(`ERROR: UserController-signUp - ${JSON.stringify(error)}`);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    logger.info(`INFO: UserController-login - User Email: ${req.body.email}`);
    const { email, password } = req.body;

    const userObject = new UserClass();

    const [existingUser] = await userObject.getUsers({
      email,
      active: true,
    });

    if (!existingUser) {
      throw new ApplicationError(
        409,
        code.USER_FAILURE_CODES.USER_NOT_FOUND,
        message.USER_MESSAGES.USER_NOT_FOUND,
        { email: email }
      );
    }

    const isAuthenticated = compareSync(password, existingUser.password);

    if (!isAuthenticated) {
      throw new ApplicationError(
        401,
        code.USER_FAILURE_CODES.INVALID_LOGIN,
        message.USER_MESSAGES.INVALID_LOGIN,
        { email }
      );
    }

    const { password: passwordHash, ...user } = existingUser;

    user.token = await generateToken(user.id);

    res.status(200).send({
      success: true,
      responseCode: code.SUCCESS_CODES.GENERIC_SUCCESS,
      message: message.USER_MESSAGES.LOGIN_SUCCESS,
      data: { user },
    });
  } catch (error) {
    logger.error(`ERROR: UserController-login - ${error}`);
    next(error);
  }
};
