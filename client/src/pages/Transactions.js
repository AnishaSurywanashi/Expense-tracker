import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { TransactionRow } from '../components/TransactionRow';
import { AddTransactionModal } from '../components/AddTransactionModal';
import { EmptyState } from '../components/EmptyState';
import { ALL_CATEGORIES } from '../components/CategoryBadge';
import { FiPlus, FiSearch, FiInbox } from 'react-icons/fi';

const Transactions = () => {
  const { transactions, getTransactions, loading } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter and sort
  let filtered = [...transactions];

  if (searchTerm) {
    filtered = filtered.filter(t =>
      t.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (categoryFilter) {
    filtered = filtered.filter(t => t.category === categoryFilter);
  }

  if (typeFilter) {
    if (typeFilter === 'income') {
      filtered = filtered.filter(t => t.amount > 0);
    } else {
      filtered = filtered.filter(t => t.amount < 0);
    }
  }

  // Sort
  switch (sortBy) {
    case 'date-asc':
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case 'amount-desc':
      filtered.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
      break;
    case 'amount-asc':
      filtered.sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount));
      break;
    case 'date-desc':
    default:
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
  }

  // Summary
  const totalIncome = filtered.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = filtered.filter(t => t.amount < 0).reduce((acc, t) => acc + Math.abs(t.amount), 0);

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
          <h1 className="page-title">Transactions</h1>
          <p className="page-subtitle">
            {filtered.length} transaction{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)} id="transactions-add-btn">
          <FiPlus /> Add Transaction
        </button>
      </div>

      {/* Summary Bar */}
      <div style={{
        display: 'flex',
        gap: '24px',
        marginBottom: '24px',
        fontSize: '14px',
        color: 'var(--text-secondary)',
      }}>
        <span>
          Income: <strong style={{ color: 'var(--accent-emerald)' }}>${totalIncome.toFixed(2)}</strong>
        </span>
        <span>
          Expenses: <strong style={{ color: 'var(--accent-rose)' }}>${totalExpense.toFixed(2)}</strong>
        </span>
        <span>
          Net: <strong style={{ color: totalIncome - totalExpense >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
            ${(totalIncome - totalExpense).toFixed(2)}
          </strong>
        </span>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="search-input-wrapper">
          <FiSearch className="search-icon" />
          <input
            className="search-input"
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="search-transactions"
          />
        </div>

        <select
          className="filter-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          id="filter-category"
        >
          <option value="">All Categories</option>
          {ALL_CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="filter-select"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          id="filter-type"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          id="sort-transactions"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>
      </div>

      {/* Transaction List */}
      <div className="glass-card">
        {filtered.length > 0 ? (
          <ul className="transaction-list">
            {filtered.map(t => (
              <TransactionRow key={t._id} transaction={t} />
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={<FiInbox />}
            title="No transactions found"
            text={searchTerm || categoryFilter || typeFilter
              ? "Try adjusting your filters"
              : "Add your first transaction to get started"}
          />
        )}
      </div>

      <AddTransactionModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Transactions;
