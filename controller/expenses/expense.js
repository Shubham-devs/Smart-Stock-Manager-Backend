const ExpenseModel = require("../../models/expense.model");
const expenseSchema = require("../../services/expenseSchema");

// Add Expense
const addExpense = async (req, res, next) => {
    try {
        const expenseValues = await expenseSchema.validateAsync(req.body);
        const { date, category, amount, notes } = expenseValues;

        const newExpense = new ExpenseModel({
            date,
            category,
            amount,
            notes,
        });

        await newExpense.save();

        res.status(200).json({
            message: "Expense added successfully",
            success: true,
            data: newExpense,
        });
    } catch (error) {
        console.error("Error during addExpense:", error);
        next(error);
    }
};

// View All Expenses
const viewExpense = async (req, res, next) => {
    try {
        const expenses = await ExpenseModel.find();
        res.status(200).json(expenses);
    } catch (error) {
        console.error("Error during viewExpense:", error);
        next(error);
    }
};

// Delete Expense
const deleteExpense = async (req, res, next) => {
    try {
        await ExpenseModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("Error during deleteExpense:", error);
        next(error);
    }
};

module.exports = { addExpense, viewExpense, deleteExpense };
