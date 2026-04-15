import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';
import { getCategoryConfig } from '../components/CategoryBadge';
import { FiTrendingUp, FiTrendingDown, FiPieChart } from 'react-icons/fi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Filler, Tooltip, Legend
);

const Analytics = () => {
  const { transactions, getTransactions, getStats, loading } = useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
    getStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate from transactions
  const amounts = transactions.map(t => t.amount);
  const income = amounts.filter(a => a > 0).reduce((acc, a) => acc + a, 0);
  const expense = amounts.filter(a => a < 0).reduce((acc, a) => acc + Math.abs(a), 0);

  // Category breakdown from local data
  const categoryTotals = {};
  transactions.forEach(t => {
    if (t.amount < 0) {
      const cat = t.category || 'Other';
      categoryTotals[cat] = (categoryTotals[cat] || 0) + Math.abs(t.amount);
    }
  });

  const sortedCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1]);

  const categoryColors = sortedCategories.map(([cat]) => getCategoryConfig(cat).color);


  // Doughnut chart
  const doughnutData = {
    labels: sortedCategories.map(([cat]) => cat),
    datasets: [{
      data: sortedCategories.map(([, val]) => val),
      backgroundColor: categoryColors.map(c => c + '40'),
      borderColor: categoryColors,
      borderWidth: 2,
      hoverOffset: 8,
    }],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
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
          label: (ctx) => `${ctx.label}: $${numberWithCommas(ctx.parsed.toFixed(2))}`
        }
      },
    },
  };

  // Monthly data for bar chart
  const monthlyMap = {};
  transactions.forEach(t => {
    const date = new Date(t.createdAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!monthlyMap[key]) monthlyMap[key] = { income: 0, expense: 0 };
    if (t.amount > 0) monthlyMap[key].income += t.amount;
    else monthlyMap[key].expense += Math.abs(t.amount);
  });

  const sortedMonths = Object.keys(monthlyMap).sort();
  const monthLabels = sortedMonths.map(k => {
    const [y, m] = k.split('-');
    return new Date(y, m - 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  });

  const barData = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Income',
        data: sortedMonths.map(k => monthlyMap[k].income),
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: '#10b981',
        borderWidth: 1,
        borderRadius: 6,
        barPercentage: 0.6,
      },
      {
        label: 'Expenses',
        data: sortedMonths.map(k => monthlyMap[k].expense),
        backgroundColor: 'rgba(244, 63, 94, 0.6)',
        borderColor: '#f43f5e',
        borderWidth: 1,
        borderRadius: 6,
        barPercentage: 0.6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#94a3b8',
          font: { family: 'Inter', size: 12 },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(10, 14, 39, 0.9)',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: { family: 'Inter' },
        bodyFont: { family: 'Inter' },
        padding: 12,
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: $${numberWithCommas(ctx.parsed.y.toFixed(2))}`
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
          callback: (v) => `$${v}`
        },
        border: { display: false },
      },
    },
  };

  // Cumulative balance line chart
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
  let runningBalance = 0;
  const balanceData = sortedTransactions.map(t => {
    runningBalance += t.amount;
    return {
      date: new Date(t.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      balance: runningBalance,
    };
  });

  // Take last 20 data points max for readability
  const balanceSlice = balanceData.slice(-20);

  const lineData = {
    labels: balanceSlice.map(d => d.date),
    datasets: [{
      label: 'Balance',
      data: balanceSlice.map(d => d.balance),
      borderColor: '#7c3aed',
      backgroundColor: 'rgba(124, 58, 237, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: '#7c3aed',
      borderWidth: 2,
    }],
  };

  const lineOptions = {
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
          label: (ctx) => `Balance: $${numberWithCommas(ctx.parsed.y.toFixed(2))}`
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
          callback: (v) => `$${v}`
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
      <div className="page-header">
        <h1 className="page-title">Analytics</h1>
        <p className="page-subtitle">Visualize your spending patterns and financial trends</p>
      </div>

      {/* Top Summary */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="stat-card emerald">
          <div className="stat-card-header">
            <span className="stat-card-label">Total Income</span>
            <div className="stat-card-icon emerald"><FiTrendingUp /></div>
          </div>
          <div className="stat-card-value">${numberWithCommas(income.toFixed(2))}</div>
        </div>
        <div className="stat-card rose">
          <div className="stat-card-header">
            <span className="stat-card-label">Total Expenses</span>
            <div className="stat-card-icon rose"><FiTrendingDown /></div>
          </div>
          <div className="stat-card-value">${numberWithCommas(expense.toFixed(2))}</div>
        </div>
        <div className="stat-card violet">
          <div className="stat-card-header">
            <span className="stat-card-label">Savings Rate</span>
            <div className="stat-card-icon violet"><FiPieChart /></div>
          </div>
          <div className="stat-card-value">
            {income > 0 ? ((income - expense) / income * 100).toFixed(1) : 0}%
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="content-grid">
        {/* Category Doughnut */}
        <div className="chart-card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Spending by Category</h3>
              <p className="card-subtitle">Expense distribution breakdown</p>
            </div>
          </div>
          {sortedCategories.length > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ width: '55%', height: '250px' }}>
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
              <div style={{ flex: 1 }}>
                {sortedCategories.map(([cat, val]) => {
                  const config = getCategoryConfig(cat);
                  const pct = expense > 0 ? (val / expense * 100).toFixed(1) : 0;
                  return (
                    <div key={cat} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: '1px solid var(--border-glass)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          width: 8, height: 8, borderRadius: '50%',
                          background: config.color, display: 'inline-block'
                        }} />
                        <span style={{ fontSize: '13px' }}>{cat}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>
                          ${numberWithCommas(val.toFixed(2))}
                        </span>
                        <span style={{
                          fontSize: '11px', color: 'var(--text-muted)',
                          marginLeft: '8px'
                        }}>
                          {pct}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No expense data to display</p>
            </div>
          )}
        </div>

        {/* Monthly Bar Chart */}
        <div className="chart-card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Monthly Comparison</h3>
              <p className="card-subtitle">Income vs Expenses by month</p>
            </div>
          </div>
          <div className="chart-container">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Balance Trend Line */}
        <div className="chart-card full-width">
          <div className="card-header">
            <div>
              <h3 className="card-title">Balance Trend</h3>
              <p className="card-subtitle">Running balance over time</p>
            </div>
          </div>
          <div className="chart-container">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
