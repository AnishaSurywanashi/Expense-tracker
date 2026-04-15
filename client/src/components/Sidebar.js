import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiGrid, FiList, FiPieChart, FiTarget,
  FiMenu, FiX, FiDollarSign
} from 'react-icons/fi';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: <FiGrid /> },
  { path: '/transactions', label: 'Transactions', icon: <FiList /> },
  { path: '/analytics', label: 'Analytics', icon: <FiPieChart /> },
  { path: '/budgets', label: 'Budgets', icon: <FiTarget /> },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <button
        className="sidebar-mobile-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
        id="sidebar-toggle"
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={closeSidebar}
      />

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <Link to="/" className="sidebar-logo" style={{ textDecoration: 'none' }}>
          <div className="sidebar-logo-svg">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Logo Gradient Definition */}
              <defs>
                <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="var(--accent-violet)" />
                  <stop offset="1" stopColor="var(--accent-cyan)" />
                </linearGradient>
              </defs>
              {/* Shield Outline */}
              <motion.path
                d="M20 5C14 5 8 8 8 15C8 25 20 35 20 35C20 35 32 25 32 15C32 8 26 5 20 5Z"
                stroke="url(#logo-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              {/* Rising Graph Line */}
              <motion.path
                d="M14 22L18 18L22 21L26 15"
                stroke="url(#logo-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
              />
            </svg>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <h1>FinanceFlow</h1>
            <span>Smart Expense Tracker</span>
          </motion.div>
        </Link>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={closeSidebar}
              id={`nav-${item.label.toLowerCase()}`}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              <span className="sidebar-link-text">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div style={{
            padding: '16px',
            borderRadius: '12px',
            background: 'rgba(124, 58, 237, 0.1)',
            border: '1px solid rgba(124, 58, 237, 0.2)',
          }}>
            <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>
              FinanceFlow Pro
            </p>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Track smarter. Spend wiser. Build wealth.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
