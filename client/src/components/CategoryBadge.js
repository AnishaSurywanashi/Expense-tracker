import React from 'react';
import {
  FiShoppingBag, FiTruck, FiShoppingCart, FiFileText,
  FiFilm, FiHeart, FiBook, FiDollarSign, FiBriefcase,
  FiTrendingUp, FiMoreHorizontal
} from 'react-icons/fi';

const categoryConfig = {
  Food: { icon: <FiShoppingBag />, color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.15)' },
  Transport: { icon: <FiTruck />, color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.15)' },
  Shopping: { icon: <FiShoppingCart />, color: '#ec4899', bgColor: 'rgba(236, 72, 153, 0.15)' },
  Bills: { icon: <FiFileText />, color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.15)' },
  Entertainment: { icon: <FiFilm />, color: '#a855f7', bgColor: 'rgba(168, 85, 247, 0.15)' },
  Health: { icon: <FiHeart />, color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.15)' },
  Education: { icon: <FiBook />, color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.15)' },
  Salary: { icon: <FiDollarSign />, color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.15)' },
  Freelance: { icon: <FiBriefcase />, color: '#7c3aed', bgColor: 'rgba(124, 58, 237, 0.15)' },
  Investment: { icon: <FiTrendingUp />, color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.15)' },
  Other: { icon: <FiMoreHorizontal />, color: '#94a3b8', bgColor: 'rgba(148, 163, 184, 0.15)' },
};

export const getCategoryConfig = (category) => {
  return categoryConfig[category] || categoryConfig.Other;
};

export const CategoryBadge = ({ category }) => {
  const config = getCategoryConfig(category);
  return (
    <span
      className={`category-badge ${(category || 'other').toLowerCase()}`}
    >
      {config.icon}
      {category || 'Other'}
    </span>
  );
};

export const EXPENSE_CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Education', 'Other'];
export const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investment', 'Other'];
export const ALL_CATEGORIES = [...new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES])];
