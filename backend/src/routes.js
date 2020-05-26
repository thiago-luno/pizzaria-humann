const express = require('express');

const UserController = require('./controllers/UserController');
const AuthenticateController = require('./controllers/AuthenticateController');
const OrderController = require('./controllers/OrderController');

const routes = express.Router();

routes.post('/users', UserController.create);
routes.post('/login', AuthenticateController.create);
routes.post('/order', OrderController.create);
routes.get('/order', OrderController.index);

module.exports = routes;