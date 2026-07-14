

// // Load environment variables
// require("dotenv").config();

// // Import required packages
// const express = require("express");
// const cors = require("cors");

// // Import database connection
// const connectDB = require("./config/db");

// // Create Express app
// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Default Route
// app.get("/", (req, res) => {
//     res.send("🚀 Personal Finance Tracker Backend is Running Successfully...");
// });

// // Test API
// app.get("/api/test", (req, res) => {
//     res.json({
//         success: true,
//         message: "Backend API is working successfully!"
//     });
// });

// // Port
// const PORT = process.env.PORT || 5000;

// // Start Server
// app.listen(PORT, () => {
//     console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/budget", budgetRoutes);
app.get("/", (req, res) => {
    res.send("Personal Finance Tracker Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});



