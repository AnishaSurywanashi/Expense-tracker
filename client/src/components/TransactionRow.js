import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { getCategoryConfig } from './CategoryBadge';
import { numberWithCommas } from '../utils/format';
import { FiTrash2 } from 'react-icons/fi';

export const TransactionRow = ({ transaction, showDelete = true }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const isExpense = transaction.amount < 0 || transaction.type === 'expense';
  const catConfig = getCategoryConfig(transaction.category || 'Other');
  const date = new Date(transaction.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <li className="transaction-item">
      <div
        className="transaction-item-icon"
        style={{
          background: catConfig.bgColor,
          color: catConfig.color,
        }}
      >
        {catConfig.icon}
      </div>

      <div className="transaction-item-info">
        <div className="transaction-item-text">{transaction.text}</div>
        <div className="transaction-item-category">
          {transaction.category || 'Other'}
        </div>
      </div>

      <span className="transaction-item-date">{formattedDate}</span>

      <span className={`transaction-item-amount ${isExpense ? 'expense' : 'income'}`}>
        {isExpense ? '-' : '+'}${numberWithCommas(Math.abs(transaction.amount).toFixed(2))}
      </span>

      {showDelete && (
        <button
          className="transaction-item-delete"
          onClick={() => deleteTransaction(transaction._id)}
          title="Delete transaction"
          id={`delete-transaction-${transaction._id}`}
        >
          <FiTrash2 />
        </button>
      )}
    </li>
  );
};
