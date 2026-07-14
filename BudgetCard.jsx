function BudgetCard({ budget, transactions = [] }) {
  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const monthlyBudget = budget?.amount || 0;

  const percentage =
    monthlyBudget > 0
      ? Math.min((totalExpense / monthlyBudget) * 100, 100)
      : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        Monthly Budget
      </h2>

      <div className="space-y-3">

        <div className="flex justify-between">
          <span>Budget</span>

          <span className="font-bold text-green-600">
            ₹{monthlyBudget}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Spent</span>

          <span className="font-bold text-red-600">
            ₹{totalExpense}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4">

          <div
            className={`h-4 rounded-full ${
              percentage > 80
                ? "bg-red-500"
                : "bg-green-500"
            }`}
            style={{ width: `${percentage}%` }}
          ></div>

        </div>

        <p className="text-right text-gray-600">
          {percentage.toFixed(1)}%
        </p>

      </div>

    </div>
  );
}

export default BudgetCard;