// routes/api/payment.route.js
const Router = require("express").Router();
const payBill = require("../../controller/payment/payBill");
const updateBillStatus = require("../../controller/payment/updateBillStatus");

Router.post("/payBill", payBill);
Router.get("/updateBillStatus", updateBillStatus);

module.exports = Router;
