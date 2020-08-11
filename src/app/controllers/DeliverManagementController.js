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
      return res.status(401).json({ error: `You're not allowed to deliver or pickup this order!`})   
    }

    /**
     * Check if the order can be PICK UP or END UP by checking de canceled_at column
     */

    if(order.canceled_at !== null) {
      return res.status(401).json({ warning: `You can't manage a already canceled order!`})
    }

    /**
     * Check if is there any signature_id on query params
     */

    let pickups = 0

    //If there's no signature_id we try to PICK UP an order
    if(!signature_id) {

      if(order.start_date !== null) {
        return res.status(400).json({ warning: `You've already picked up this order!`})
      } 

      //Not working yet
      if(pickups>= 5) {
        return res.status(400).json({ warning: `You've already picked up 5 orders today, try again tomorrow!`})
      }

      order.start_date = new Date()
      pickups++

      console.log(pickups);

      await order.save()

      return res.json(order)
    }

    /**
     * You can only END UP a order if it been already PICKED UP
     */

    if(order.start_date === null) {
      return res.status(400).json({ warning: `You can't end up a non started order!`})
    }

    if(order.end_date !== null) {
      return res.status(400).json({ warning: `You've already end up this order!`})
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