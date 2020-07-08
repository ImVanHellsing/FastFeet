import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findOne();

      if (!users) {
        console.log('User not found');

        return res.status(404).json({ message: 'User not found.' });
      }

      return res.json(users);
    } catch (error) {
      console.log(`Error= ${error}`);
      return res.status(400).json({ message: 'Error occured.' });
    }
  }
}

export default new UserController();
