import * as Yup from 'yup';

// Models
import Order from '../models/Order';

class OrderController {
  async store(req, res) {
    /**
     * Yup validation
     */

    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      console.log(req.body);

      return res.status(400).json({ error: 'Validation failure!' });
    }

    /**
     * Destructuring and returning the validated User Data
     */

    const data = await Order.create(req.body);

    return res.json(data);
  }

  async index(req, res) {
    /**
     * Database recipients search
     */

    try {
      const orders = await Order.findAll(); 

      if (!orders) {
        return res.status(404).json({ message: 'Orders not found!' });
      }

      return res.json(orders);
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

    const data = await Order.findByPk(id);

    if (!data) {
      return res.status(404).json({ error: 'Order not found!' });
    }

    /**
     * Destructuring and returning the validated User Data
     */

    await Order.update(req.body, { where: { id } });

    return res.json(req.body);
  }

  async delete(req, res) {
    /**
     * Checking if the ID provided is valid
     */

    const { id } = req.params;

    const data = await Order.findByPk(id);

    if (!data) {
      return res.status(404).json({ error: 'Order not found!' });
    }

    // Deleting
    await Order.destroy({ where: { id } });

    // Returning a simple info about the recent deleted data
    return res.json({
      message: `The Order was successfully deleted!`,
    });
  }
}

export default new OrderController()