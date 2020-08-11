import Sequelize, { Model } from 'sequelize'
import { isWithinInterval } from 'date-fns';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        recipient_id: Sequelize.INTEGER,
        deliveryman_id: Sequelize.INTEGER,
        signature_id: Sequelize.INTEGER,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        startable: {
          type: Sequelize.VIRTUAL,
          get() {
            const currentDateTime = new Date()
            const currentYear = currentDateTime.getFullYear()
            const currentMonth = currentDateTime.getMonth()
            const currentDay = currentDateTime.getDate()

            return isWithinInterval(new Date, { 
              //wWorking
              start: new Date(currentYear, currentMonth, currentDay, 8, 0, 0, 0), 
              end: new Date(currentYear, currentMonth, currentDay, 16, 0, 0, 0) 
            })
          }
        }
      },{
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Deliver, { foreignKey: 'deliveryman_id', as: 'deliver' });
    this.belongsTo(models.Recipient, { foreignKey: 'recipient_id', as: 'recipient' });
  }
}

export default Order;