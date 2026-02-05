// first step
// that u have to req data from frontend
// second step
//uss data ko verify
// third step
// save, update, delete, read
// fourth step
// response
const bcrypt = require("bcryptjs")
const RegisterModel = require("../../models/Register.model");
const { registerValidation } = require("../../services/validationsSchema");

const register = async (req, res, next) => {
    try {
        // step 1
        const registerValues = await registerValidation.validateAsync(req.body);
        // console.log(registerValues.email);
        const { name, email, password, confirmPassword } = registerValues;


        const userExist = await RegisterModel.findOne({ email: email })
        // console.log("user = ", userExist)
        if (userExist) {
            return res.status(400).json({ message: "User already exists plz use new/other email id for register", success: false, })
        }

        // 🔸 4. Hash password
        // const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new RegisterModel({
            name: name,
            email: email,
            password: hashedPassword,
        })
        await newUser.save();

        res.status(200).json({
            message: "User registered successfully",
            success: true,
        })

    } catch (error) {
        console.error("Error during registered : ", error)
        next(error);
    }
}

module.exports = register