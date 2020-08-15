//Env
import 'dotenv/config';

import express from 'express';
import path from 'path'

//Routes
import routes from './routes';

//DataBase Connection
import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use('/files', 
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
