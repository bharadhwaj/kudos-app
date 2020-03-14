import { config } from 'dotenv';
config();

import { utils } from '../constants';

export const env = process.env.NODE_ENV || utils.ENV.DEV;
