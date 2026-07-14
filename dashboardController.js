const Transaction = require("../models/Transaction");

// ===========================================
// GET DASHBOARD SUMMARY
// GET /api/dashboard
// ===========================================

const getDashboard = async (req, res) => {

    try {

        // Get all transactions of logged in user
        const transactions = await Transaction.find({
            user: req.user
        });

        // Total Income
        const totalIncome = transactions
            .filter(t => t.type === "Income")
            .reduce((sum, t) => sum + t.amount, 0);

        // Total Expense
        const totalExpense = transactions
            .filter(t => t.type === "Expense")
            .reduce((sum, t) => sum + t.amount, 0);

        // Balance
        const balance = totalIncome - totalExpense;

        // Category Wise Expense
        const categorySummary = {};

        transactions.forEach(transaction => {

            if (transaction.type === "Expense") {

                if (!categorySummary[transaction.category]) {

                    categorySummary[transaction.category] = 0;

                }

                categorySummary[transaction.category] += transaction.amount;

            }

        });

        // Monthly Summary
        const monthlySummary = {};

        transactions.forEach(transaction => {

            const month = new Date(transaction.date).toLocaleString(
                "default",
                {
                    month: "long",
                    year: "numeric"
                }
            );

            if (!monthlySummary[month]) {

                monthlySummary[month] = {
                    income: 0,
                    expense: 0
                };

            }

            if (transaction.type === "Income") {

                monthlySummary[month].income += transaction.amount;

            } else {

                monthlySummary[month].expense += transaction.amount;

            }

        });

        res.status(200).json({

            success: true,

            summary: {

                balance,

                totalIncome,

                totalExpense,

                categorySummary,

                monthlySummary

            }

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

module.exports = {
    getDashboard
};