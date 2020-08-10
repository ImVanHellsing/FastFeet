import { Router } from 'express';

// Controllers
import RecipientsController from './app/controllers/RecipientsController';
import DeliversController from './app/controllers/DeliversController';
import SessionController from './app/controllers/SessionController';
import OrdersController from './app/controllers/OrdersController';
import UserController from './app/controllers/UserController';

// Middlewares
import authMiddleware from './app/middlewares/auth';

const routes = Router();

// ADM (Only for testing)
routes.get('/user', UserController.index);

// Login and authentication
routes.post('/sessions', SessionController.store);

// Middleware usage (Adm authentication require)
routes.use(authMiddleware);

// Recipients
routes.get('/recipients', RecipientsController.index);
routes.post('/recipients', RecipientsController.store);
routes.put('/recipients/:id', RecipientsController.update);
routes.delete('/recipients/:id', RecipientsController.delete);

// Delivers
routes.get('/delivers', DeliversController.index);
routes.post('/delivers', DeliversController.store);
routes.put('/delivers/:id', DeliversController.update);
routes.delete('/delivers/:id', DeliversController.delete);

// Orders
routes.get('/orders', OrdersController.index);
routes.post('/orders', OrdersController.store);
routes.put('/orders/:id', OrdersController.update);
routes.delete('/orders/:id', OrdersController.delete);

export default routes;
