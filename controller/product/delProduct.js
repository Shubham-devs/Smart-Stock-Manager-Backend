const addProductModel = require("../../models/addProduct.model")
const addProductSchema = require("../../services/addProductSchema")

const delProduct = async (req, res, next) => {
    try {

        const { id } = req.params; // get product ID from URL
        console.log(id);
        const delProductValues = await addProductSchema.validateAsync(res.body)


        const delproduct = await addProductModel.findByIdAndDelete(id)
        res.status(200).json(' prodct delete');


    } catch (error) {
        console.log('error during delete product')
        next(error)
    }
}
module.exports = delProduct;
