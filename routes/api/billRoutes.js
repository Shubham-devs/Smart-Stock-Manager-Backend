// routes/billRoutes.js
const express = require("express");
const router = express.Router();
const billController = require("../../controller/billController");

router.post("/saveBill", billController.saveBill);
router.get("/recentBills", billController.getRecentBills);

router.get("/allBills", billController.getAllBills);
router.put("/payBill/:id", billController.payBill);


module.exports = router;
