import httpContext from 'express-http-context';

import { code, message } from '../constants';
import { decodeToken } from '../lib/token';

const authorize = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({
        success: false,
        responseCode: code.APPLICATION_ERROR_CODES.UNAUTHORIZED,
        message: message.APPLICATION_ERROR_MESSAGES.UNAUTHORIZED,
        data: {},
      });
    }
    const stripStart = 'Bearer '.length;
    const userIdToken = authHeader.substring(stripStart);

    const [userId, token] = userIdToken.split(',');

    const decodedToken = await decodeToken(token);

    if (+userId !== +decodedToken.id) {
      return res.status(401).send({
        success: false,
        responseCode: code.APPLICATION_ERROR_CODES.UNAUTHORIZED,
        message: message.APPLICATION_ERROR_MESSAGES.UNAUTHORIZED,
        data: {},
      });
    }

    if (req.params.userId) {
      if (+userId !== +req.params.userId) {
        return res.status(403).send({
          success: false,
          responseCode: code.APPLICATION_ERROR_CODES.FORBIDDEN,
          message: message.APPLICATION_ERROR_MESSAGES.FORBIDDEN,
          data: {},
        });
      }
    }

    if (userId) {
      httpContext.set(
        'reqId',
        'USER_ID_' + userId + '_' + httpContext.get('reqId')
      );
    }
    next();
  } catch (err) {
    return res.status(401).send({
      success: false,
      responseCode: code.APPLICATION_ERROR_CODES.UNAUTHORIZED,
      message: message.APPLICATION_ERROR_MESSAGES.UNAUTHORIZED,
      data: { error: err.toString() },
    });
  }
};

export default authorize;
