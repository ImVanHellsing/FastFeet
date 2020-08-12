//Models
import Order from '../models/Order'
import OrderProblem from '../models/OrderProblem'

//Lib
import Mail from '../../lib/Mail'
import Deliver from '../models/Deliver'
import Recipient from '../models/Recipient'

class OrderProblemsController {

  async index(req, res) {
    
    const orderProblems = await OrderProblem.findAll()

    return res.status(201).json(orderProblems)
  }

  async show(req, res) {

    const { order_problem_id } = req.params

    const orderProblem = await OrderProblem.findByPk(order_problem_id)

    return res.status(201).json(orderProblem)
  }

  async store(req, res) {
    
    if(!req.body.description || !req.body.order_id ) {
      return res.status(400).json({ error: 'Validation failure!' })
    }

    const { id } = await OrderProblem.create(req.body)

    const recentProblem = await OrderProblem.findByPk(id, {
      include: [
        {
          model: Order,
          as: 'order',
          attributes: ['id', 'product', 'start_date', 'end_date']
        }
      ]
    })

    return res.status(201).json({
      product:{
        id: recentProblem.id,
        description: recentProblem.description,
      },
      order: recentProblem.order
    }) 
  }

  async update(req, res) {

    const { problem_id } = req.params

    const { order_id } = await OrderProblem.findByPk(problem_id)

    const orderToBeCanceled = await Order.findByPk(order_id, {
      include: [
        {
          model: Deliver,
          as: 'deliver',
          attributes: ['name', 'email']
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name']
        },
      ]
    })

    if(orderToBeCanceled.end_date !== null) {
      return res.status(400).json({ error: `You can't cancel an already ended up order!` })
    }

    if(orderToBeCanceled.canceled_at !== null) {
      return res.status(400).json({ error: `This order've already canceled!` })
    }

    orderToBeCanceled.canceled_at = new Date()

    await orderToBeCanceled.save()

    await Mail.sendMail({
      to: `${orderToBeCanceled.deliver.name} <${orderToBeCanceled.deliver.email}>`,
      subject: 'Cancelamento de entrega',
      text: `${orderToBeCanceled.deliver.name}, a entrega '${orderToBeCanceled.product}' destinada o/a ${orderToBeCanceled.recipient.name} foi cancelada!`
    })

    return res.status(201).json({
      message: `The Order was successfully deleted!`,
    });
  }
}

export default new OrderProblemsController()