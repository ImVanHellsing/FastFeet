import { Op } from 'sequelize'

//Models
import Order from '../models/Order'
import Deliver from '../models/Deliver'

class DeliverManagementController {
  async index(req, res) {
    const { id } = req.params

    const orders = await Order.findAll({ 
      where: { 
        deliveryman_id: id,
        canceled_at: null,
        end_date: null,
      }
    })

    return res.status(201).json(orders)
  }
  
  async show(req, res) {
    const { id } = req.params

    const handledOrders = await Order.findAll({ 
      where: { 
        deliveryman_id: id,
        [Op.not]: {
          end_date: null
        }
      }
    })

    return res.status(201).json(handledOrders)
  }

  async update(req, res) {

    const { id, order_id } = req.params
    const { signature_id } = req.query

    /**
     * Check if is there any signature_id on query params
     */

    if(!signature_id) {
      return res.status(401).json({ error: `Signature_id not provided!`})
    }
    
    /**
     * Check if the order_id belongs to the provided DeliveryMan
     */
    const order = await Order.findByPk(order_id, {
      include: {
        model: Deliver,
        as: 'deliver',
        attributes: ['id']
      }
    })

    if(!(id == order.deliver.id)) {
      return res.status(401).json({ error: `You're not allowed to deliver this order!`})   
    }

    /**
     * Saving the end_date to the order
     */
    order.end_date = new Date()

    await order.save()

    return res.json(order)
  }
}

export default new DeliverManagementController()