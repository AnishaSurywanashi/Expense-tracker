const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Public
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount, category, type } = req.body;

    const transaction = await Transaction.create({
      text,
      amount,
      category: category || 'Other',
      type: type || (amount < 0 ? 'expense' : 'income')
    });
  
    return res.status(201).json({
      success: true,
      data: transaction
    }); 
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
}

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if(!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      });
    }

    await Transaction.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      data: {}
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc    Get transaction stats (monthly summary, category breakdown)
// @route   GET /api/v1/transactions/stats
// @access  Public
exports.getTransactionStats = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();

    // Category breakdown for expenses
    const categoryBreakdown = {};
    const monthlyData = {};

    transactions.forEach(t => {
      // Category breakdown
      if (t.amount < 0 || t.type === 'expense') {
        const cat = t.category || 'Other';
        categoryBreakdown[cat] = (categoryBreakdown[cat] || 0) + Math.abs(t.amount);
      }

      // Monthly data
      const date = new Date(t.createdAt);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyData[key]) {
        monthlyData[key] = { income: 0, expense: 0 };
      }
      if (t.amount > 0 || t.type === 'income') {
        monthlyData[key].income += Math.abs(t.amount);
      } else {
        monthlyData[key].expense += Math.abs(t.amount);
      }
    });

    return res.status(200).json({
      success: true,
      data: {
        categoryBreakdown,
        monthlyData
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}