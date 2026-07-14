const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  setBudget,
  getBudget,
} = require("../controllers/budgetController");

// Save or Update Budget
router.post("/", protect, setBudget);

// Get Current Budget
router.get("/", protect, getBudget);

module.exports = router;