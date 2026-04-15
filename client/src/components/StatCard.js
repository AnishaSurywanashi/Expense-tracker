import React from 'react';

export const StatCard = ({ label, value, icon, variant = 'violet', change }) => {
  return (
    <div className={`stat-card ${variant}`}>
      <div className="stat-card-header">
        <span className="stat-card-label">{label}</span>
        <div className={`stat-card-icon ${variant}`}>
          {icon}
        </div>
      </div>
      <div className="stat-card-value">{value}</div>
      {change && (
        <div className={`stat-card-change ${change >= 0 ? 'positive' : 'negative'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
        </div>
      )}
    </div>
  );
};
