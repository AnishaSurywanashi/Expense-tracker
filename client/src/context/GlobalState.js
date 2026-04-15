import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial state
const initialState = {
  transactions: [],
  budgets: [],
  stats: null,
  error: null,
  loading: true,
  budgetLoading: true,
  statsLoading: true
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // ===== Transaction Actions =====
  async function getTransactions() {
    try {
      const res = await axios.get('/api/v1/transactions');
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response ? err.response.data.error : 'Server Error'
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response ? err.response.data.error : 'Server Error'
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/v1/transactions', transaction, config);
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response ? err.response.data.error : 'Server Error'
      });
    }
  }

  // ===== Budget Actions =====
  async function getBudgets(month, year) {
    try {
      const res = await axios.get(`/api/v1/budgets?month=${month}&year=${year}`);
      dispatch({
        type: 'GET_BUDGETS',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'BUDGET_ERROR',
        payload: err.response ? err.response.data.error : 'Server Error'
      });
    }
  }

  async function addBudget(budget) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/v1/budgets', budget, config);
      dispatch({
        type: 'ADD_BUDGET',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'BUDGET_ERROR',
        payload: err.response ? err.response.data.error : 'Server Error'
      });
    }
  }

  async function deleteBudget(id) {
    try {
      await axios.delete(`/api/v1/budgets/${id}`);
      dispatch({
        type: 'DELETE_BUDGET',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'BUDGET_ERROR',
        payload: err.response ? err.response.data.error : 'Server Error'
      });
    }
  }

  // ===== Stats Actions =====
  async function getStats() {
    try {
      const res = await axios.get('/api/v1/transactions/stats');
      dispatch({
        type: 'GET_STATS',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'STATS_ERROR',
        payload: err.response ? err.response.data.error : 'Server Error'
      });
    }
  }

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    budgets: state.budgets,
    stats: state.stats,
    error: state.error,
    loading: state.loading,
    budgetLoading: state.budgetLoading,
    statsLoading: state.statsLoading,
    getTransactions,
    deleteTransaction,
    addTransaction,
    getBudgets,
    addBudget,
    deleteBudget,
    getStats
  }}>
    {children}
  </GlobalContext.Provider>);
}