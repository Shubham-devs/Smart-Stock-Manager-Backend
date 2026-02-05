// first step
// that u have to req data from frontend
// second step
//uss data ko verify
// third step
// save, update, delete, read
// fourth step
// response

const bcrypt = require("bcryptjs");
const RegisterModel = require("../../models/Register.model");
const { loginValidation } = require("../../services/validationsSchema");
const jwt = require('jsonwebtoken')
const login = async (req, res, next) => {
    try {
        // step 1
        const loginValues = await loginValidation.validateAsync(req.body);
        console.log(loginValues);
        const { email, password } = loginValues;


        const userExist = await RegisterModel.findOne({ email: email })
        console.log("user = ", userExist)
        if (!userExist) {
            return res.status(400).json({ message: "User not exists", success: false, })
        }

        // 2️⃣ Compare plain password with hashed password
        const isMatch = await bcrypt.compare(password, userExist.password);
        console.log(isMatch)
 
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // console.log(userExist)
        const payload = {
            name: userExist.name,
            email: userExist.email,
            password: userExist.password
        }
        // jwt json web token
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        // console.log(token)

        res.status(200).json({
            message: "User login successful",
            success: true,
            userToken: token
        })

    } catch (error) {
        console.error("Error during registered : ", error)
        next(error);
    }
}

module.exports = login