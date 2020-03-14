import { env, sequelizeConfig, serverConfig } from '../config';
import { utils } from '../constants';

const validEnvs = Object.values(utils.ENV);

const validateInit = () => {
  if (!validEnvs.includes(env.toString())) {
    logger.error('ERROR: Invalid Environment set.');
    return 0;
  }

  if (!serverConfig.jwt.secret) {
    logger.error('ERROR: JWT Secret missing.');
    return 0;
  }

  if (
    !sequelizeConfig[env] ||
    !sequelizeConfig[env].url ||
    !sequelizeConfig[env].options
  ) {
    logger.error('ERROR: MySQL Configuration not found.');
    return 0;
  }

  return 1;
};

export default validateInit;
