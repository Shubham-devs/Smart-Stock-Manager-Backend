const Joi = require("joi");

const expenseSchema = Joi.object({
    date: Joi.date().required(),
    category: Joi.string().required(),
    amount: Joi.number().positive().required(),
    notes: Joi.string().allow("").max(100),
});

module.exports = expenseSchema;
