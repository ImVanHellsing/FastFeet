import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  /**
   * Check if is there any token in the request
   */
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided.' });
  }

  // Spliting token
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Set user_id into Request
    req.userId = decoded.id;

    console.log(decoded);

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid.' });
  }
};
