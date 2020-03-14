import moment from 'moment-timezone';
import morgan from 'morgan';
import { createStream } from 'rotating-file-stream';

import { LOGDIR } from '../lib/winston';

let loggerFormat =
  '[:date[Asia/Kolkata]] :id :method :url HTTP/:http-version :status :response-time ms';

let accessLogStream = createStream('access.log', {
  path: LOGDIR,
});

morgan.token('date', (req, res, tz) => {
  return moment()
    .tz(tz)
    .format();
});

morgan.token('id', (req, res) => {
  return `[reqid: ${req.id}]`;
});

export const morganAccessLogger = morgan(loggerFormat, {
  stream: accessLogStream,
});

export const morganStdErr = morgan(loggerFormat, {
  skip: function(req, res) {
    return res.statusCode < 400;
  },
  stream: process.stderr,
});

export const morganStdOut = morgan(loggerFormat, {
  skip: function(req, res) {
    return res.statusCode >= 400;
  },
  stream: process.stdout,
});
