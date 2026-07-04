const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");

// Middleware
const protect = require("./middleware/authMiddleware");

// Load Environment Variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 Enterprise CRM Backend is Running!");
});

// Protected Test Route
app.get("/api/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Protected Route Accessed Successfully",
    user: req.user,
  });
});

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});