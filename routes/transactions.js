const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction, getTransactionStats } = require('../controllers/transactions');

router
  .route('/')
  .get(getTransactions)
  .post(addTransaction);

router
  .route('/stats')
  .get(getTransactionStats);

router
  .route('/:id')
  .delete(deleteTransaction);

module.exports = router;