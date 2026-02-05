const Router = require('express').Router();
const mailer = require('../../controller/mail');

Router.post('/sendmail', mailer);


module.exports = Router;