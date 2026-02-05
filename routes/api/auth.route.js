const Router = require('express').Router();
const register = require('../../controller/auth/register');
const login = require('../../controller/auth/login');

Router.post('/register', register);
Router.post('/login', login);


module.exports = Router;