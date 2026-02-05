const Joi = require("joi");

const addProductSchema = Joi.object({
    name: Joi.string().required(),
    purchasePrice: Joi.number().required(),
    retailPrice: Joi.number().required(),
    wholesalePrice: Joi.number().required(),
    stock: Joi.number().required(),
    purchaseDate: Joi.string().required(),
    expiryDate: Joi.string(),
})

module.exports = addProductSchema;