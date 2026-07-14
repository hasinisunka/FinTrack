function SummaryCards({ balance = 0, income = 0, expense = 0 }) {
  const cards = [
    {
      title: "Balance",
      amount: balance,
      color: "bg-blue-500",
      icon: "💰",
    },
    {
      title: "Income",
      amount: income,
      color: "bg-green-500",
      icon: "📈",
    },
    {
      title: "Expense",
      amount: expense,
      color: "bg-red-500",
      icon: "📉",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">

      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300`}
        >
          <div className="flex justify-between items-center">

            <div>
              <h3 className="text-lg font-semibold">
                {card.title}
              </h3>

              <p className="text-3xl font-bold mt-3">
                ₹{card.amount}
              </p>
            </div>

            <div className="text-5xl">
              {card.icon}
            </div>

          </div>
        </div>
      ))}

    </div>
  );
}

export default SummaryCards;