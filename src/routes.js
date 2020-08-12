import { Router } from 'express';

// Controllers
import DeliverManagementController from './app/controllers/DeliverManagementController';
import OrderProblemsController from './app/controllers/OrderProblemsController';
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

// Deliver Management
routes.get('/deliveryman/:id/handled', DeliverManagementController.show);
routes.get('/deliveryman/:id/deliveries', DeliverManagementController.index);
routes.put('/deliveryman/:id/end_order/:order_id', DeliverManagementController.update);

// Order Problems
routes.get('/orders/:order_problem_id/problems', OrderProblemsController.show);
routes.post('/orders/problems', OrderProblemsController.store);
routes.get('/orders/problems', OrderProblemsController.index);

// Cancel Order
routes.put('/problem/:problem_id/cancel_order', OrderProblemsController.update);

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
