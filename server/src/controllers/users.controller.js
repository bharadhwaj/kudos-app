import { hashSync, compareSync } from 'bcryptjs';
import moment from 'moment-timezone';

import KudosClass from '../classes/kudos.class';
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
      {
        excludeFields: [
          'password',
          'active',
          'createdAt',
          'updatedAt',
          'active',
          'organisationId',
        ],
      }
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

    const [existingUser] = await userObject.getUsers(
      {
        email,
        active: true,
      },
      {
        excludeFields: [
          'active',
          'createdAt',
          'updatedAt',
          'active',
          'organisationId',
        ],
      }
    );

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
      data: {
        user,
      },
    });
  } catch (error) {
    logger.error(`ERROR: UserController-login - ${error}`);
    next(error);
  }
};

export const giveKudos = async (req, res, next) => {
  try {
    logger.info(
      `INFO: UserController-giveKudos - Given By: ${req.params.userId} - Received By: ${req.body.receiverUserId} - Comments: ${req.body.comments}`
    );

    const givenByUserId = +req.params.userId;
    const receivedByUserId = +req.body.receiverUserId;
    const comments = req.body.comments;

    const userObject = new UserClass();
    const kudosObject = new KudosClass();

    if (givenByUserId === receivedByUserId) {
      throw new ApplicationError(
        405,
        code.USER_FAILURE_CODES.SELF_KUDOS_NOT_ALLOWED,
        message.USER_MESSAGES.SELF_KUDOS_NOT_ALLOWED,
        { givenByUserId, receivedByUserId }
      );
    }

    const kudosCount = await kudosObject.getCurrentWeekKudosCountByUser(
      givenByUserId
    );

    if (kudosCount >= 3) {
      throw new ApplicationError(
        405,
        code.USER_FAILURE_CODES.KUDOS_LIMIT_REACHED,
        message.USER_MESSAGES.KUDOS_LIMIT_REACHED,
        { userId: givenByUserId }
      );
    }

    const givenByUser = await userObject.getUserById(givenByUserId);

    const receivedByUser = await userObject.getUserById(receivedByUserId);

    if (givenByUser.organisationId !== receivedByUser.organisationId) {
      throw new ApplicationError(
        405,
        code.USER_FAILURE_CODES.OUTSIDE_ORGANISATION_KUDOS,
        message.USER_MESSAGES.OUTSIDE_ORGANISATION_KUDOS,
        { givenByUserId, receivedByUserId }
      );
    }

    const hasGivenTodoThisWeek = await kudosObject.hasGivenKudosToThisUserThisWeek(
      givenByUserId,
      receivedByUserId
    );

    if (hasGivenTodoThisWeek) {
      throw new ApplicationError(
        405,
        code.USER_FAILURE_CODES.KUDOS_ALREADY_GIVEN,
        message.USER_MESSAGES.KUDOS_ALREADY_GIVEN,
        { givenByUserId, receivedByUserId }
      );
    }

    const kudos = await kudosObject.addKudos(
      givenByUserId,
      receivedByUserId,
      comments
    );

    res.status(201).send({
      success: true,
      responseCode: code.SUCCESS_CODES.GENERIC_SUCCESS,
      message: message.KUDOS_MESSAGES.KUDOS_ADDED,
      data: { kudos },
    });
  } catch (error) {
    logger.error(`ERROR: UserController-giveKudos - ${error}`);
    next(error);
  }
};

export const getKudos = async (req, res, next) => {
  try {
    logger.info(
      `INFO: UserController-getKudos - User ID: ${req.params.userId}`
    );

    const userId = +req.params.userId;

    const userObject = new UserClass();
    const kudosObject = new KudosClass();

    await userObject.getUserById(userId);

    const kudosStartDate = moment().startOf('week');
    const kudosEndDate = moment().endOf('week');
    const givenKudosCount = await kudosObject.getCurrentWeekKudosCountByUser(
      userId
    );
    const kudosGiven = await kudosObject.getKudosGivenByUserThisWeek(userId);
    const receivedKudosCount = await kudosObject.getCurrentWeekKudosCountForUser(
      userId
    );
    const kudosReceived = await kudosObject.getKudosReceivedForUserThisWeek(
      userId
    );

    res.status(200).send({
      success: true,
      responseCode: code.SUCCESS_CODES.GENERIC_SUCCESS,
      message: message.KUDOS_MESSAGES.FETCH_KUDOS,
      data: {
        kudosStartDate,
        kudosEndDate,
        givenKudosCount,
        kudosGiven,
        receivedKudosCount,
        kudosReceived,
      },
    });
  } catch (error) {
    logger.error(`ERROR: UserController-getKudos - ${error}`);
    next(error);
  }
};
