const { bool } = require("joi");
const { model, Schema } = require("mongoose");
// const { min } = require("../services/validationsSchema");

const registerSchema = new Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, },
    password: { type: String, minlengt: 6, required: true, },
    // confirmPassword: { type: String, minlengt: 6, required: true, },
    agreement: { type: Boolean, required: true, default: false, }

})

module.exports = model("register", registerSchema, "register")