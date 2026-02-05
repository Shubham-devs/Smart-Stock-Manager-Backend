// controllers/billController.js
const Bill = require("../models/Bill.model");
const Product = require("../models/addProduct.model");


exports.saveBill = async (req, res) => {
    try {
        const {
            billId,
            customerName,
            customerEmail,
            products,
            subtotal,
            discount,
            total,
            status,
            paymentMethod,
        } = req.body;


        // ================================
        // 1. VALIDATE & UPDATE STOCK
        // ================================
        for (const item of products) {
            const product = await Product.findById(item._id);

            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.name}` });
            }

            // Check stock availability
            if (product.stock < item.qty) {
                return res.status(400).json({
                    message: `Not enough stock for ${product.name}`,
                    available: product.stock,
                });
            }

            // Reduce stock
            product.stock -= item.qty;
            await product.save();
        }

        // ================================
        // 2. SAVE BILL IN DATABASE
        // ================================


        // Convert UI status ("paid"/"unpaid") to stored status ("Paid"/"Unpaid")
        const finalStatus = status === "paid" ? "paid" : "unpaid";

        const newBill = new Bill({
            // billId: "INV-" + Date.now(),  // SAVE INVOICE NUMBER
            billId,
            customerName,
            customerEmail,
            products,
            subtotal,
            discount,
            total,
            status: finalStatus,
            paymentMethod: finalStatus === "Paid" ? paymentMethod : null,
        });

        const savedBill = await newBill.save();
        res.status(201).json(savedBill);
    } catch (error) {
        console.error("Error saving bill:", error);
        res.status(500).json({
            message: "Failed to save bill",
            error: error.message,
        });
    }
};


// ---------------------------
// Get Recent Bills (Limit 5 for Dashboard)
// ---------------------------
exports.getRecentBills = async (req, res) => {
    try {
        // Get the 5 most recent bills, sorted by creation date
        const recentBills = await Bill.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .lean();

        // Transform the data to match your table structure
        const formattedBills = recentBills.map(bill => {
            // Calculate the total quantity of all products in the bill
            const totalQuantity = bill.products.reduce((sum, product) => sum + product.qty, 0);

            return {
                key: bill._id,
                customerName: bill.customerName,
                date: new Date(bill.createdAt).toLocaleDateString(),
                product: bill.products.map(p => `${p.name} (${p.qty})`).join(', '),
                quantity: totalQuantity,
                price: bill.total - bill.discount, // Price before discount
                total: bill.total,
            };
        });

        res.status(200).json(formattedBills);
    } catch (error) {
        console.error("Error fetching recent bills:", error);
        res.status(500).json({ message: "Failed to fetch recent bills", error: error.message });
    }
};



// ---------------------------
// Get All Bills (for Report Page)
// ---------------------------
exports.getAllBills = async (req, res) => {
    try {
        const bills = await Bill.find().sort({ createdAt: -1 });

        const formatted = bills.map((bill) => ({
            _id: bill._id,
            billId: bill.billId,
            customerName: bill.customerName,
            customerEmail: bill.customerEmail,
            amount: bill.total, // <-- matches frontend
            status: bill.status,
        }));

        return res.status(200).json({ allBills: formatted });
    } catch (err) {
        console.error("Fetch Error:", err);
        res.status(500).json({ message: "Failed to fetch bills" });
    }
};

// ---------------------------
// Pay Bill (Update Status)
// ---------------------------
exports.payBill = async (req, res) => {
    try {
        const billId = req.params.id;

        const updatedBill = await Bill.findByIdAndUpdate(
            billId,
            { status: "paid" },
            { new: true }
        );

        if (!updatedBill) {
            return res.status(404).json({ message: "Bill not found" });
        }

        return res.status(200).json({
            message: "Bill Paid Successfully",
            updatedBill,
        });
    } catch (error) {
        console.error("Error updating bill:", error);
        return res.status(500).json({
            message: "Failed to update bill",
            error: error.message,
        });
    }
};


