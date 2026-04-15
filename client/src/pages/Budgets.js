import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { BudgetCard } from '../components/BudgetCard';
import { EmptyState } from '../components/EmptyState';
import { EXPENSE_CATEGORIES } from '../components/CategoryBadge';
import { FiPlus, FiTarget, FiX } from 'react-icons/fi';

const Budgets = () => {
  const { budgets, getBudgets, addBudget } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');

  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  useEffect(() => {
    getBudgets(month, year);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !limit) return;

    addBudget({
      category,
      limit: parseFloat(limit),
      month,
      year
    });

    setCategory('');
    setLimit('');
    setShowModal(false);

    // Refresh budgets after a short delay
    setTimeout(() => getBudgets(month, year), 500);
  };

  const totalBudget = budgets.reduce((acc, b) => acc + b.limit, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + (b.spent || 0), 0);
  const overallPct = totalBudget > 0 ? (totalSpent / totalBudget * 100).toFixed(1) : 0;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Budgets</h1>
          <p className="page-subtitle">Set and track monthly spending limits by category</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)} id="add-budget-btn">
          <FiPlus /> Add Budget
        </button>
      </div>

      {/* Month Selector */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '28px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <select
          className="filter-select"
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
          id="budget-month"
        >
          {monthNames.map((name, i) => (
            <option key={i} value={i + 1}>{name}</option>
          ))}
        </select>
        <select
          className="filter-select"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          id="budget-year"
        >
          {[2024, 2025, 2026, 2027].map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        {budgets.length > 0 && (
          <div style={{
            marginLeft: 'auto',
            display: 'flex',
            gap: '24px',
            fontSize: '14px',
            color: 'var(--text-secondary)'
          }}>
            <span>
              Total Budget: <strong style={{ color: 'var(--text-primary)' }}>${totalBudget.toFixed(2)}</strong>
            </span>
            <span>
              Spent: <strong style={{ color: overallPct > 80 ? 'var(--accent-rose)' : 'var(--accent-emerald)' }}>
                ${totalSpent.toFixed(2)} ({overallPct}%)
              </strong>
            </span>
          </div>
        )}
      </div>

      {/* Budget Cards Grid */}
      {budgets.length > 0 ? (
        <div className="budget-grid">
          {budgets.map(budget => (
            <BudgetCard key={budget._id} budget={budget} />
          ))}
        </div>
      ) : (
        <div className="glass-card">
          <EmptyState
            icon={<FiTarget />}
            title="No budgets set"
            text={`Set spending limits for ${monthNames[month - 1]} ${year} to track your budget goals`}
          />
        </div>
      )}

      {/* Add Budget Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content animate-fadeInUp" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)} id="close-budget-modal">
              <FiX />
            </button>
            <h2 className="modal-title">Add Budget</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Set a spending limit for {monthNames[month - 1]} {year}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="budget-category">Category</label>
                <select
                  className="form-select"
                  id="budget-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  {EXPENSE_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="budget-limit">Spending Limit ($)</label>
                <input
                  className="form-input"
                  type="number"
                  id="budget-limit"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  placeholder="500.00"
                  min="1"
                  step="0.01"
                  required
                />
              </div>

              <button className="btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }} id="submit-budget">
                <FiPlus /> Set Budget
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;
