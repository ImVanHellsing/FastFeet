import Sequelize from 'sequelize';

// Configs
import databaseConfig from '../config/database';

// Models
import User from '../app/models/User';
import Order from '../app/models/Order';
import Deliver from '../app/models/Deliver';
import Recipient from '../app/models/Recipient';

const Models = [User, Order, Recipient, Deliver];

class DatabaseConnection {
  constructor() {
    this.init();
  }

  init() {

    //Starts de connection
    this.connection = new Sequelize(databaseConfig);

    // Initialize all models with the connection and the associations
    Models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }
}

export default new DatabaseConnection();
