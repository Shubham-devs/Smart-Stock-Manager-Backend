const Joi = require("joi");


//register validation
const registerValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6).required(),
    agreement: Joi.boolean().required(),
})

//login validation
const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})


module.exports = { registerValidation, loginValidation };