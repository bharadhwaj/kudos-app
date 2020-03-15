import jwt from 'jsonwebtoken';

import { serverConfig } from '../config';

export function generateToken(id) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      serverConfig.jwt.secret,
      { expiresIn: '7 days' },
      (err, token) => {
        if (err) {
          return reject(err);
        }
        resolve(token);
      }
    );
  });
}

export function decodeToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, serverConfig.jwt.secret, (err, decoded) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(decoded);
    });
  });
}
