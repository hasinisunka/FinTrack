import API from "../services/api";

function TransactionList({
  transactions = [],
  fetchTransactions,
}) {
  const deleteTransaction = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);

      alert("Transaction Deleted");

      fetchTransactions();
    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mt-8">

      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        Recent Transactions
      </h2>

      {transactions.length === 0 ? (
  <div className="text-center py-10">

    <h2 className="text-2xl font-semibold text-gray-500">
      <div className="text-center py-10">

  <div className="text-6xl mb-4">
    📄
  </div>

  <h2 className="text-2xl font-bold text-gray-600">
    No Transactions Yet
  </h2>

  <p className="text-gray-400 mt-2">
    Start by adding your first income or expense.
  </p>

</div>
    </h2>

    <p className="text-gray-400 mt-2">
      Add your first transaction to get started.
    </p>

  </div>

      ) : (
        <div className="space-y-4">

          {transactions.map((item) => (

            <div
              key={item._id}
              className="flex justify-between items-center border rounded-xl p-4 hover:shadow-md transition"
            >

              <div>

                <h3 className="font-bold text-lg">
                  {item.title}
                </h3>

                <p className="text-gray-500">
                  {item.category}
                </p>

                <p className="text-sm text-gray-400">
                  {new Date(item.date).toLocaleDateString()}
                </p>

              </div>

              <div className="text-right">

                <span
                  className={`font-bold text-lg ${
                    item.type === "Income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ₹{item.amount}
                </span>

                <br />

                <button
                  onClick={() => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this transaction?"
  );

  if (confirmDelete) {
    deleteTransaction(item._id);
  }
}}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default TransactionList;