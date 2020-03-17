import Sequelize from 'sequelize';

import { env, sequelizeConfig } from '../config';
import logger from './logger';

export const sequelize = new Sequelize(
  sequelizeConfig[env].url,
  sequelizeConfig[env].options
);

const connectSequelize = async () => {
  try {
    logger.info(`INFO: Sequelize-connectSequelize`);

    await sequelize.authenticate();

    logger.debug(
      `DEBUG: Sequelize-connectSequelize: MySQL connected successfully.`
    );

    const syncCondition =
      process.env.ADD_DUMMY_DATA == 1 ? { force: true } : {};

    return sequelize.sync(syncCondition);
  } catch (error) {
    logger.error(`ERROR: Sequelize-connectSequelize - ${error}`);
  }
};

export default connectSequelize;
