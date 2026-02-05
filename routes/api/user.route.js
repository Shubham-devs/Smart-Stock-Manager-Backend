const express = require("express");
const router = express.Router();
const userController = require("../../controller/userprofile");

// No middleware
router.get("/profiles", userController.getProfile);
router.put("/profile", userController.updateProfile);

module.exports = router;
