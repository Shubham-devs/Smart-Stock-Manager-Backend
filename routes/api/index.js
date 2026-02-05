const Router = require('express').Router();
const auth = require('./auth.route');
const product = require('./product.route');
const mail = require('./mail.route');
const payment = require('./payment.route');
const expenses = require('./expenses.route');
const checkAuth = require('../../midelware/checkAuth');
const billRoutes = require("./billRoutes");
const user = require("./user.route");

Router.use('/auth', auth);
Router.use('/product', checkAuth, product);
Router.use('/mail', mail)
Router.use('/payment', payment)
Router.use('/expenses', expenses)


Router.use("/bills", billRoutes);
Router.use("/user", user);


module.exports = Router;