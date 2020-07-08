import Sequelize from 'sequelize';

// Configs
import databaseConfig from '../config/database';

// Models
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';

const Models = [User, Recipient];

class DatabaseConnection {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    Models.map((model) => model.init(this.connection));
  }
}

export default new DatabaseConnection();
