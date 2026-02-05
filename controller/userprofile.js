const User = require("../models/User.model");

// Fetch single user (first user in DB)
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findOne();
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile", error: error.message });
    }
};

// Update ONLY name
exports.updateProfile = async (req, res) => {
    try {
        const { name } = req.body;

        const user = await User.findOne();
        if (!user) return res.status(404).json({ message: "User not found" });

        user.name = name; // only update name
        await user.save();

        res.json({
            message: "Name updated successfully",
            user: {
                name: user.name,
                email: user.email, // unchanged
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating name", error: error.message });
    }
};
