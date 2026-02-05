// controller/payment/updateBillStatus.js
const Bill = require("../../models/Bill.model");

const updateBillStatus = async (req, res, next) => {
    try {
        const { billId, payment_status } = req.query;

        if (!billId) {
            return res.status(400).json({ message: "Bill ID is required" });
        }

        // Update the bill status based on payment_status
        const updatedBill = await Bill.findByIdAndUpdate(
            billId,
            { status: payment_status === "success" ? "paid" : "unpaid" },
            { new: true }
        );

        if (!updatedBill) {
            return res.status(404).json({ message: "Bill not found" });
        }

        res.status(200).json({
            message: `Bill status updated to ${updatedBill.status}`,
            bill: updatedBill,
        });
    } catch (error) {
        console.error("Error during updateBillStatus:", error);
        next(error);
    }
};

module.exports = updateBillStatus;
