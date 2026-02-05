const Router = require('express').Router();
const addProduct = require('../../controller/product/addProduct')
const viewProduct = require('../../controller/product/viewProduct')
const editProduct = require('../../controller/product/editProduct')
const delProduct = require('../../controller/product/delProduct');
const findOneProduct = require('../../controller/product/findOneProduct');

Router.post('/addProduct', addProduct)
Router.get('/viewProduct', viewProduct)
Router.get('/findOneProduct/:id', findOneProduct)
Router.put('/editProduct/:id', editProduct)
Router.delete('/delProduct/:id', delProduct)


module.exports = Router;