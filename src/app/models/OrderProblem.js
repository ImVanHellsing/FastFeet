import Sequelize, { Model } from 'sequelize'

class OrderProblem extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        order_id: Sequelize.INTEGER,
      },{
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
  }
}

export default OrderProblem;