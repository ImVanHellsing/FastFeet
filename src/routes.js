import { Router } from 'express';

// Controllers
import RecipientsController from './app/controllers/RecipientsController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

// Middlewares
import authMiddleware from './app/middlewares/auth';

const routes = Router();

// User show (Only for testing)
routes.get('/user', UserController.index);

// User login and authentication
routes.post('/sessions', SessionController.store);

// Middleware usage
routes.use(authMiddleware);

// Recipients
routes.get('/recipients', RecipientsController.index);
routes.post('/recipients', RecipientsController.store);
routes.put('/recipients/:id', RecipientsController.update);
routes.delete('/recipients/:id', RecipientsController.delete);

export default routes;
