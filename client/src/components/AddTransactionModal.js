import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from './CategoryBadge';
import { FiX, FiPlus } from 'react-icons/fi';

export const AddTransactionModal = ({ isOpen, onClose }) => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');

  const { addTransaction } = useContext(GlobalContext);

  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !amount) return;

    const numAmount = Math.abs(parseFloat(amount));

    const newTransaction = {
      text: text.trim(),
      amount: type === 'expense' ? -numAmount : numAmount,
      category: category || 'Other',
      type
    };

    addTransaction(newTransaction);
    setText('');
    setAmount('');
    setCategory('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fadeInUp" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} id="close-add-modal">
          <FiX />
        </button>
        <h2 className="modal-title">Add Transaction</h2>

        <form onSubmit={handleSubmit}>
          {/* Type Toggle */}
          <div className="form-group">
            <label className="form-label">Type</label>
            <div className="form-type-toggle">
              <button
                type="button"
                className={`form-type-btn ${type === 'expense' ? 'active expense' : ''}`}
                onClick={() => { setType('expense'); setCategory(''); }}
                id="type-expense"
              >
                Expense
              </button>
              <button
                type="button"
                className={`form-type-btn ${type === 'income' ? 'active income' : ''}`}
                onClick={() => { setType('income'); setCategory(''); }}
                id="type-income"
              >
                Income
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="transaction-text">Description</label>
            <input
              className="form-input"
              type="text"
              id="transaction-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g., Grocery shopping"
              required
            />
          </div>

          {/* Amount & Category */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="transaction-amount">Amount ($)</label>
              <input
                className="form-input"
                type="number"
                id="transaction-amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min="0.01"
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="transaction-category">Category</label>
              <select
                className="form-select"
                id="transaction-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <button className="btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }} id="submit-transaction">
            <FiPlus /> Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};
