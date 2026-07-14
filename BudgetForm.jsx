import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function BudgetForm({ fetchBudget }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/budget", {
        amount: Number(amount),
      });

      toast.success("Budget Saved Successfully");

      setAmount("");

      fetchBudget();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error Saving Budget"
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-5">
        Set Monthly Budget
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="number"
          placeholder="Enter Monthly Budget"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded-lg p-3"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Save Budget
        </button>

      </form>

    </div>
  );
}

export default BudgetForm;