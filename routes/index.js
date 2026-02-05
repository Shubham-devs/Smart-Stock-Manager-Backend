const Router = require('express').Router();
const api = require('./api/index.js');

Router.use('/api', api);
Router.use('/api', (req, res, next) => {
    console.log("route not fount")
})


module.exports = Router