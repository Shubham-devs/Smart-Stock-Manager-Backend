const express = require("express");
const router = express.Router();
const { addExpense, viewExpense, deleteExpense } = require("../../controller/expenses/expense");

// Add Expense
router.post("/addExpense", addExpense);

// View Expenses
router.get("/viewExpense", viewExpense);

// Delete Expense
router.delete("/:id", deleteExpense);

module.exports = router;
