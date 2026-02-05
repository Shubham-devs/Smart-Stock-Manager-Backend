const addProductModel = require('../../models/addProduct.model')
const addProductSchema = require('../../services/addProductSchema')

const viewProduct = async (req, res, next) => {
    try {
        const allProduct = await addProductModel.find({})

        // Format dates before sending response
        const formattedProducts = allProduct.map(product => {
            return {
                ...product._doc,
                purchaseDate: product.purchaseDate ?
                    new Date(product.purchaseDate).toISOString().split('T')[0] : null,
                expiryDate: product.expiryDate ?
                    new Date(product.expiryDate).toISOString().split('T')[0] : null
            }
        })

        if (!allProduct || allProduct.length === 0) {
            return res.status(400).json({ message: "No products found", success: false })
        }

        res.status(200).json({ allProduct: formattedProducts })
    } catch (error) {
        console.error("Error during viewproduct : ", error)
        next(error)
    }
}

module.exports = viewProduct
