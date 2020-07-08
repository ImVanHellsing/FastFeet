import jjwt from 'jsonwebtoken';
import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const verifyUser = await User.findOne({ where: { email } });

    if (!verifyUser) {
      return res.status(401).json({ error: 'User not found.' });
    }

    if (!(await verifyUser.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name } = verifyUser;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jjwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
