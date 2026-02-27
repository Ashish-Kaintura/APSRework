const express = require("express");
const connectDB = require("./config/db");
const serviceRoutes = require("./routes/services");
const blogeRoutes = require("./routes/blogs");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/services", serviceRoutes);
app.use("/api/blogs", blogeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Root endpoint
app.get("/", (req, res) => {
  res.send("APS is running ");
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
