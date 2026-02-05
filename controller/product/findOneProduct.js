const addProductModel = require("../../models/addProduct.model")
const addProductSchema = require("../../services/addProductSchema")

const findOneProduct = async (req, res, next) => {
    try {

        const { id } = req.params; // get product ID from URL

        const getProduct = await addProductModel.findById(id)
        console.log(getProduct)
        // res.status(200).json(' prodct delete');
        if (!getProduct) {
            return res.status(400).json({ message: "No product found ", })
        }
        return res.status(200).json({
            message: 'Product find successfully.',
            getProduct,
        })



    } catch (error) {
        console.log('error during find one product')
        next(error)
    }
}
module.exports = findOneProduct;
