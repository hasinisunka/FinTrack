const Budget = require("../models/Budget");

// Set or Update Budget
exports.setBudget = async (req, res) => {
  try {
    const { amount } = req.body;

    let budget = await Budget.findOne({
      user: req.user.id,
    });

    if (budget) {
      budget.amount = amount;
      await budget.save();
    } else {
      budget = await Budget.create({
        user: req.user.id,
        amount,
      });
    }

    res.json(budget);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Budget
exports.getBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      user: req.user.id,
    });

    res.json(budget);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};