import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function TransactionForm({ fetchTransactions }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    type: "Expense",
    date: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/transactions", form);

      toast.success("Transaction Added Successfully");

      setForm({
        title: "",
        amount: "",
        category: "",
        type: "Expense",
        date: "",
      });

      if (fetchTransactions) {
        fetchTransactions();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding transaction");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        Add Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Transaction Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-4 py-3"
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Salary">Salary</option>
          <option value="Other">Other</option>
        </select>

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-4 py-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Add Transaction
        </button>

      </form>
    </div>
  );
}

export default TransactionForm;