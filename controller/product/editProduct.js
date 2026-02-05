const addProductModel = require("../../models/addProduct.model")
const addProductSchema = require("../../services/addProductSchema")

const editProduct = async (req, res, next) => {
    try {

        const { id } = req.params; // get product ID from URL
        const updateData = req.body;// Data sent in request body to update
        console.log(id)
        console.log(updateData)

        const editproduct = await addProductModel.findByIdAndUpdate(id, updateData, { new: true })
        console.log(editproduct)
        if (!editProduct) {
            return res.status(400).json({ message: "No product found ", })
        }
        return res.status(200).json({
            message: 'Product updated successfully.',
            product: editProduct,
        })



    } catch (error) {
        console.log('error during edit product')
        next(error)
    }
}
module.exports = editProduct;
