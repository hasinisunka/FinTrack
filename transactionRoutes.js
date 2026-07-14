const express = require("express");
const router = express.Router();

const {
  addTransaction,
  getTransactions,
  deleteTransaction,
} = require("../controllers/transactionController");

const { protect } = require("../middleware/authMiddleware");

// Add Transaction
router.post("/", protect, addTransaction);

// Get All Transactions
router.get("/", protect, getTransactions);

// Delete Transaction
router.delete("/:id", protect, deleteTransaction);

module.exports = router;