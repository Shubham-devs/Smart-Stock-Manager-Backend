// models/Bill.model.js
const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
    {
        billId: { type: String, required: true, unique: true },

        customerName: { type: String, required: true },
        customerEmail: { type: String, required: false },

        products: [
            {
                name: { type: String, required: true },
                qty: { type: Number, required: true },
                price: { type: Number, required: true },
                total: { type: Number, required: true },
            },
        ],
        subtotal: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        total: { type: Number, required: true },
        status: {
            type: String,
            enum: ["paid", "unpaid"],
            // default: "unpaid",
            required: true,
        },
        paymentMethod: {
            type: String,
            enum: ["cash", "card", "upi"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Bill", billSchema);
