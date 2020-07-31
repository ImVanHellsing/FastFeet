import jwt from 'jsonwebtoken';

// Models
import User from '../models/User';

// Config
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const verifyUser = await User.findOne({ where: { email } });

    /**
     * Check and validate user data
     */

    if (!verifyUser) {
      return res.status(401).json({ error: 'User not found!' });
    }

    if (!(await verifyUser.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match!' });
    }

    const { id, name } = verifyUser;

    /**
     * Create and return Json-Web-Token to de front-end
     */

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
