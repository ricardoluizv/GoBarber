import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Adicionar o middleare de forma local:
// routes.put('/users', authMiddleware, UserController.update);

// Adiciona o middleware de forma global, a partir desta linha estará disponçiveis as demais rotas, antes disso não funcionará
routes.use(authMiddleware);

// De forma global não especifica o middleware nos parâmetros de .put
routes.put('/users', UserController.update);

export default routes;
