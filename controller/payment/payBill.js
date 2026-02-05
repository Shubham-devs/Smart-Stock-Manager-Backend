// controller/payment/payBill.js
const Stripe = require("stripe");
const dotenv = require("dotenv");
const Bill = require("../../models/Bill.model"); // Import the Bill model
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const payBill = async (req, res, next) => {
    try {
        const { customerName, cart, discount, total } = req.body;

        // Validate payload
        if (!cart || cart.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Save the bill to the database with status "unpaid"
        const newBill = new Bill({
            customerName,
            products: cart,
            subtotal: cart.reduce((sum, item) => sum + item.total, 0),
            discount,
            total,
            status: "unpaid",
        });

        await newBill.save();

        // Create Stripe PaymentIntent
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: cart.map((item) => ({
                price_data: {
                    currency: "usd",
                    product_data: { name: item.name },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.qty,
            })),
            mode: "payment",
            success_url: `http://localhost:5173/?key=3&payment_status=success&billId=${newBill._id}`,
            cancel_url: `http://localhost:5173/?key=3&payment_status=failed&billId=${newBill._id}`,
        });

        // Return the Stripe session URL
        res.status(200).json({
            message: "Payment session created successfully",
            url: session.url,
            billId: newBill._id,
        });
    } catch (error) {
        console.error("Error during payBill:", error);
        next(error);
    }
};

module.exports = payBill;
