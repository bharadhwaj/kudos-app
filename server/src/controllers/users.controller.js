import { hashSync } from 'bcryptjs';

import UserClass from '../classes/users.class';

import { code, message, utils } from '../constants';

import logger from '../lib/logger';

export const signUp = async (req, res, next) => {
  try {
    logger.info(
      `INFO: UserController-signUp - User Email: ${JSON.stringify(
        req.body.email
      )}`
    );
    const { password, ...userInfo } = req.body;

    userInfo.password = hashSync(password, utils.SALT_ROUND);

    const userObject = new UserClass();
    const { statusCode, response } = await userObject.signUp(userInfo);

    res.status(statusCode).send(response);
  } catch (error) {
    logger.error(`ERROR: UserController-signUp - ${JSON.stringify(error)}`);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    logger.info(
      `INFO: UserController-login - User Email: ${JSON.stringify(
        req.body.email
      )}`
    );
    const { email, password } = req.body;

    const userObject = new UserClass();
    const { statusCode, response } = await userObject.login(email, password);

    res.status(statusCode).send(response);
  } catch (error) {
    logger.error(`ERROR: UserController-login - ${error}`);
    next(error);
  }
};
