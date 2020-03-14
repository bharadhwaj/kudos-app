import fs from 'fs';
import path from 'path';
import winston from 'winston';
import 'winston-daily-rotate-file';

import { env } from '../config';
import { utils } from '../constants';

const { combine, timestamp, printf } = winston.format;

export const LOGDIR = process.env['API_LOGS_DIR'] || 'logs';

if (!fs.existsSync(LOGDIR)) {
  fs.mkdirSync(LOGDIR);
}

let suppressLogs = false;
if (env === utils.ENV.TEST) {
  suppressLogs = true;
}

let options = {
  dailyErrorFile: {
    level: 'error',
    filename: path.join(LOGDIR, 'error.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    handleExceptions: true,
    json: false,
    colorize: false,
    silent: suppressLogs,
    tailable: true,
  },
  dailyFile: {
    level: 'debug',
    filename: path.join(LOGDIR, 'app.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    handleExceptions: true,
    json: false,
    colorize: false,
    silent: suppressLogs,
    tailable: true,
  },
  console: {
    level: 'silly',
    handleExceptions: true,
    json: false,
    colorize: true,
    silent: suppressLogs,
    timestamp: true,
  },
};

const transports = [
  new winston.transports.DailyRotateFile(options.dailyFile),
  new winston.transports.DailyRotateFile(options.dailyErrorFile),
];

if (env === utils.ENV.TEST || env === utils.ENV.DEV) {
  transports.push(new winston.transports.Console(options.console));
}

export const wlogger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports,
  exitOnError: false,
});
