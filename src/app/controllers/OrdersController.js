import * as Yup from 'yup';

// Models
import Order from '../models/Order';
import Deliver from '../models/Deliver';
import Recipient from '../models/Recipient';

//Lib
import Mail from '../../lib/Mail'

class OrderController {
  async store(req, res) {
    /**
     * Yup validation
     */

    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      console.log(req.body);

      return res.status(400).json({ error: 'Validation failure!' });
    }

    /**
     * Destructuring and returning the validated User Data
     */

    const { id, product } = await Order.create(req.body)

    const order = await Order.findByPk(id, {
      include: [
        {
          model: Deliver,
          as: 'deliver',
          attributes: ['id', 'name','email']
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'street', 'number', 'complement']
        },
      ],
    });

    await Mail.sendMail({
      to: `${order.deliver.name} <${order.deliver.email}>`,
      subject: 'Nova entrega para retirada',
      text: `${order.deliver.name}, você tem uma nova entrega, '${product}', destinada o/a ${order.recipient.name}, no endereço ${order.recipient.street} ${order.recipient.number} / ${order.recipient.complement}.`
    })
    
    return res.json(order);
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