import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import Charts from "../components/Charts";
import BudgetCard from "../components/BudgetCard";
import BudgetForm from "../components/BudgetForm";
import Footer from "../components/Footer";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const res = await API.get("/transactions");

      setTransactions(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Budget
  const fetchBudget = async () => {
    try {
      const res = await API.get("/budget");

      setBudget(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchBudget();
  }, []);

  // Calculate Summary
  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expense;

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>

          <p className="mt-4 text-gray-600 font-semibold">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* Heading */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Personal Finance Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your income, expenses and monthly budget.
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards
          balance={balance}
          income={income}
          expense={expense}
        />

        {/* Forms */}
        <div className="grid lg:grid-cols-2 gap-8">

          <TransactionForm
            fetchTransactions={fetchTransactions}
          />

          <BudgetForm
            fetchBudget={fetchBudget}
          />

        </div>

        {/* Budget Card */}
        <BudgetCard
          budget={budget}
          transactions={transactions}
        />

        {/* Charts */}
        <Charts
          transactions={transactions}
        />

        {/* Transaction List */}
        <TransactionList
          transactions={transactions}
          fetchTransactions={fetchTransactions}
        />

      </div>

      <Footer />

    </div>
  );
}

export default Dashboard;