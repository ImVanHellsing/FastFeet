import * as Yup from 'yup';

//Models
import Deliver from '../models/Deliver'

class DeliversController {
  async store(req, res) {
    /**
     * Yup validation
     */

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      console.log(req.body);

      return res.status(400).json({ error: 'Validation failure!' });
    }

    /**
     * Destructuring and returning the validated User Data
     */

    const {
      name,
      email,
      avatar_id
    } = await Deliver.create(req.body);

    return res.json({
      name,
      email,
      avatar_id
    });
  }

  async index(req, res) {
    /**
     * Database recipients search
     */

    try {
      const delivers = await Deliver.findAll(); 

      if (!delivers) {
        return res.status(404).json({ message: 'Delivers not found!' });
      }

      return res.json(delivers);
    } catch (error) {

      console.log(`Error= ${error}`);
      return res.status(500).json({ error: 'Internal server occurred!' });
    }
  }

  async update(req, res) {
    /**
     * Checking if the ID provided is valid
     */

    const { id } = req.params;

    const data = await Deliver.findByPk(id);

    if (!data) {
      return res.status(404).json({ error: 'Recipient not found!' });
    }

    /**
     * Destructuring and returning the validated User Data
     */

    await Deliver.update(req.body, { where: { id } });

    return res.json(req.body);
  }

  async delete(req, res) {
    /**
     * Checking if the ID provided is valid
     */

    const { id } = req.params;

    const data = await Deliver.findByPk(id);

    if (!data) {
      return res.status(404).json({ error: 'Deliver not found!' });
    }

    // Deleting
    await Deliver.destroy({ where: { id } });

    // Returning a simple info about the recent deleted data
    return res.json({
      message: 'The Deliver was successfully deleted!',
    });
  }
}

export default new DeliversController()