import Sequelize from 'sequelize';

// Configs
import databaseConfig from '../config/database';

// Models
import User from '../app/models/User';
import Order from '../app/models/Order';
import Deliver from '../app/models/Deliver';
import Recipient from '../app/models/Recipient';
import OrderProblem from '../app/models/OrderProblem';
import File from '../app/models/File';

const Models = [ User, Order, Recipient, Deliver, OrderProblem, File ];

class DatabaseConnection {
  constructor() {
    this.init();
  }

  init() {

    //Starts the connection
    this.connection = new Sequelize(databaseConfig);

    // Initialize all models with the connection and associations
    Models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }
}

export default new DatabaseConnection();
