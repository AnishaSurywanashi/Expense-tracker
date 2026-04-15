import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { StatCard } from '../components/StatCard';
import { TransactionRow } from '../components/TransactionRow';
import { AddTransactionModal } from '../components/AddTransactionModal';
import { EmptyState } from '../components/EmptyState';
import { numberWithCommas } from '../utils/format';
import { Link } from 'react-router-dom';
import {
  FiDollarSign, FiTrendingUp, FiTrendingDown,
  FiActivity, FiPlus, FiInbox
} from 'react-icons/fi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const Dashboard = () => {
  const { transactions, getTransactions, loading } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculations
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0);
  const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0);
  const expense = amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1;
  const transactionCount = transactions.length;

  // Recent 5 transactions
  const recentTransactions = transactions.slice(0, 5);

  // Chart data — last 7 days spending
  const last7Days = [];
  const last7Labels = [];
  const last7Income = [];
  const last7Expense = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayStr = date.toLocaleDateString('en-US', { weekday: 'short' });
    last7Labels.push(dayStr);

    const dayStart = new Date(date.setHours(0, 0, 0, 0));
    const dayEnd = new Date(date.setHours(23, 59, 59, 999));

    let dayIncome = 0;
    let dayExpense = 0;

    transactions.forEach(t => {
      const tDate = new Date(t.createdAt);
      if (tDate >= dayStart && tDate <= dayEnd) {
        if (t.amount > 0) dayIncome += t.amount;
        else dayExpense += Math.abs(t.amount);
      }
    });

    last7Income.push(dayIncome);
    last7Expense.push(dayExpense);
    last7Days.push({ label: dayStr, income: dayIncome, expense: dayExpense });
  }

  const chartData = {
    labels: last7Labels,
    datasets: [
      {
        label: 'Income',
        data: last7Income,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#10b981',
        borderWidth: 2,
      },
      {
        label: 'Expense',
        data: last7Expense,
        borderColor: '#f43f5e',
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#f43f5e',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(10, 14, 39, 0.9)',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: { family: 'Inter' },
        bodyFont: { family: 'Inter' },
        padding: 12,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { color: '#64748b', font: { family: 'Inter', size: 11 } },
        border: { display: false },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: {
          color: '#64748b',
          font: { family: 'Inter', size: 11 },
          callback: (value) => `$${value}`
        },
        border: { display: false },
      },
    },
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Overview of your financial activity</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)} id="dashboard-add-btn">
          <FiPlus /> Add Transaction
        </button>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <StatCard
          label="Total Balance"
          value={`$${numberWithCommas(total.toFixed(2))}`}
          icon={<FiDollarSign />}
          variant="violet"
        />
        <StatCard
          label="Income"
          value={`$${numberWithCommas(income.toFixed(2))}`}
          icon={<FiTrendingUp />}
          variant="emerald"
        />
        <StatCard
          label="Expenses"
          value={`$${numberWithCommas(expense.toFixed(2))}`}
          icon={<FiTrendingDown />}
          variant="rose"
        />
        <StatCard
          label="Transactions"
          value={transactionCount}
          icon={<FiActivity />}
          variant="amber"
        />
      </div>

      {/* Content Grid */}
      <div className="content-grid">
        {/* Chart */}
        <div className="chart-card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Weekly Overview</h3>
              <p className="card-subtitle">Income vs Expenses — Last 7 days</p>
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                Income
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f43f5e', display: 'inline-block' }} />
                Expense
              </span>
            </div>
          </div>
          <div className="chart-container small">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="glass-card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Recent Transactions</h3>
              <p className="card-subtitle">{recentTransactions.length} latest entries</p>
            </div>
            <Link to="/transactions" className="card-action" id="view-all-transactions">
              View All →
            </Link>
          </div>

          {recentTransactions.length > 0 ? (
            <ul className="transaction-list">
              {recentTransactions.map(t => (
                <TransactionRow key={t._id} transaction={t} showDelete={false} />
              ))}
            </ul>
          ) : (
            <EmptyState
              icon={<FiInbox />}
              title="No transactions yet"
              text="Add your first transaction to start tracking your finances"
            />
          )}
        </div>
      </div>

      <AddTransactionModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Dashboard;
