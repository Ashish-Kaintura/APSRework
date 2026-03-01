const multer = require("multer");
const path = require("path");
const fs = require("fs");

// make sure upload folders exist
["uploads/blogs", "uploads/services"].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // choose folder based on route (blogs vs services)
        let folder = "uploads/blogs";
        if (req.baseUrl && req.baseUrl.includes("services")) {
            folder = "uploads/services";
        }
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );
    },
});

// File filter (optional but recommended)
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype.startsWith("image/")
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only image files allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
});

module.exports = upload;
