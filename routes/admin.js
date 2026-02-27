const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect } = require("../middleware/auth");
const { adminOnly, superAdminOnly } = require("../middleware/role");

// ✅ Admin Dashboard
router.get("/dashboard", protect, adminOnly, (req, res) => {
    res.json({
        message: "Welcome Admin",
        role: req.user.role,
    });
});

// ✅ Super Admin - Get All Users
router.get("/users", protect, superAdminOnly, async (req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
});

// ✅ Super Admin - Make Admin
router.put("/make-admin/:id", protect, superAdminOnly, async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { role: "admin" },
        { new: true }
    );

    res.json({
        message: "User promoted to Admin",
        user,
    });
});

module.exports = router;
