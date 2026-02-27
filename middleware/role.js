exports.adminOnly = (req, res, next) => {
    if (req.user.role !== "admin" && req.user.role !== "superadmin") {
        return res.status(403).json({ message: "Admin access denied" });
    }
    next();
};

exports.superAdminOnly = (req, res, next) => {
    if (req.user.role !== "superadmin") {
        return res.status(403).json({ message: "Super Admin access denied" });
    }
    next();
};
