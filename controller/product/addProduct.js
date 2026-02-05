    const addProductModel = require('../../models/addProduct.model')
    const addProductSchema = require('../../services/addProductSchema')

    const addProduct = async (req, res, next) => {
        try {
            // step 1
            const addProductValues = await addProductSchema.validateAsync(req.body);
            // console.log(addProductValues.name);
            const { name, purchasePrice, retailPrice, wholesalePrice, stock, purchaseDate, expiryDate } = addProductValues;

            
            const productExist = await addProductModel.findOne({ name: name })
            console.log("product name = ", productExist)
            if (productExist) {
                // stock:stock,
                return res.status(400).json({ message: "User already exists", success: false, })
            }

            const newProduct = new addProductModel({
                name: name,
                purchasePrice: purchasePrice,
                retailPrice: retailPrice,
                wholesalePrice: wholesalePrice,
                stock: stock,
                purchaseDate: purchaseDate,
                expiryDate: expiryDate,

            })
            await newProduct.save();

            res.status(200).json({
                message: "add product successfully",
                success: true,
            })

        } catch (error) {
            console.error("Error during addProduct : ", error)
            next(error);
        }
    }

    module.exports = addProduct 
