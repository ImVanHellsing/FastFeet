import { Router } from 'express';

// Controllers
import RecipientsController from './app/controllers/RecipientsController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

// Middlewares
import authMiddleware from './app/middlewares/auth';

const routes = Router();

// User show route (Only for testing Adm data)
routes.get('/user', UserController.index);

// User authentication route
routes.post('/sessions', SessionController.store);

// Recipients routes
routes.get('/recipients', RecipientsController.index);
routes.post('/recipients', authMiddleware, RecipientsController.store);
routes.put('/recipients/:id', authMiddleware, RecipientsController.update);
routes.delete('/recipients/:id', authMiddleware, RecipientsController.delete);

export default routes;
