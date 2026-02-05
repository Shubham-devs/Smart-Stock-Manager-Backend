const { model, Schema } = require("mongoose");
const { min } = require("../services/validationsSchema");
// const { Number } = require("joi");

const addProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    purchasePrice: {
        type: Number,
        required: true,
    },
    retailPrice: {
        type: Number,
        required: true,
    },
    wholesalePrice: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    purchaseDate: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: String,
        // required: true,
    },
})

module.exports = model("addProduct", addProductSchema, "addProduct")