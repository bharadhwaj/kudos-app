import { config } from 'dotenv';
config();

import { utils } from '../constants';

export const serverConfig = {
  port: process.env.SERVER_PORT || utils.DEFAULT_PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};
