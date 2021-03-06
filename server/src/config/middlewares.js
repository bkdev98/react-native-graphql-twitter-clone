/* eslint-disable no-param-reassign */

import bodyParser from 'body-parser';

import { decodeToken } from '../services/auth';

async function auth(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (token) {
      const user = await decodeToken(token);
      req.user = user;
    } else {
      req.user = null;
    }
    return next();
  } catch (err) {
    throw err;
  }
}

export default app => {
  app.use(bodyParser.json());
  app.use(auth);
};
