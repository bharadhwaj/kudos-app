import { config } from 'dotenv';
config();

export const sequelizeConfig = {
  development: {
    url: process.env.MYSQL_URL_DEV,
    options: {
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  },
  production: {
    url: process.env.MYSQL_URL_PRODUCTION,
    options: {
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  },
};
