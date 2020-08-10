import Sequelize, { Model } from 'sequelize'

class Deliver extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        avatar_id: Sequelize.STRING,
      },{
        sequelize
      }
    );

    return this;
  }
}

export default Deliver;