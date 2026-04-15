import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { getCategoryConfig } from './CategoryBadge';
import { numberWithCommas } from '../utils/format';
import { FiTrash2 } from 'react-icons/fi';

export const BudgetCard = ({ budget }) => {
  const { deleteBudget } = useContext(GlobalContext);

  const spent = budget.spent || 0;
  const limit = budget.limit;
  const percentage = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;
  const catConfig = getCategoryConfig(budget.category);

  let progressClass = '';
  if (percentage >= 90) progressClass = 'danger';
  else if (percentage >= 70) progressClass = 'warning';

  return (
    <div className="budget-card">
      <div className="budget-card-header">
        <div className="budget-card-category">
          <div
            className="budget-card-icon"
            style={{ background: catConfig.bgColor, color: catConfig.color }}
          >
            {catConfig.icon}
          </div>
          <span className="budget-card-name">{budget.category}</span>
        </div>
        <button
          className="budget-card-delete"
          onClick={() => deleteBudget(budget._id)}
          title="Delete budget"
          id={`delete-budget-${budget._id}`}
        >
          <FiTrash2 />
        </button>
      </div>

      <div className="budget-progress-bar">
        <div
          className={`budget-progress-fill ${progressClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="budget-amounts">
        <span className="budget-spent">
          ${numberWithCommas(spent.toFixed(2))} spent
        </span>
        <span className="budget-limit">
          of ${numberWithCommas(limit.toFixed(2))}
        </span>
      </div>

      {percentage >= 90 && (
        <div style={{
          marginTop: '8px',
          fontSize: '12px',
          color: 'var(--accent-rose)',
          fontWeight: 500
        }}>
          ⚠️ {percentage >= 100 ? 'Budget exceeded!' : 'Almost at limit!'}
        </div>
      )}
    </div>
  );
};
