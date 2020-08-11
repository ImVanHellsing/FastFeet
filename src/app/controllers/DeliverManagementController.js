import { Op } from 'sequelize'

//Models
import Order from '../models/Order'

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
}

export default new DeliverManagementController()