import { hashSync, compareSync } from 'bcryptjs';

import UserClass from '../classes/users.class';

import { code, message, utils } from '../constants';
import response from '../lib/response';
import logger from '../lib/logger';

export const createUser = async (req, res) => {
  try {
    logger.info(
      `INFO: UserController-createUser - User Email: ${JSON.stringify(
        req.body.email
      )}`
    );
    const { password, ...userInfo } = req.body;

    userInfo.password = hashSync(password, utils.SALT_ROUND);

    const userObject = new UserClass();
    const { statusCode, response } = await userObject.createUser(userInfo);

    res.status(statusCode).send(response);
  } catch (error) {
    logger.error(`ERROR: UserController-createUser - ${error}`);
    res.status(500).send({
      success: false,
      responseCode: code.APPLICATION_ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: message.APPLICATION_ERROR_MESSAGES.SERVER_ERROR,
      data: { error: error.toString() },
    });
  }
};
