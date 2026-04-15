const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');

// @desc    Get all budgets (optionally filter by month/year)
// @route   GET /api/v1/budgets
// @access  Public
exports.getBudgets = async (req, res, next) => {
  try {
    const { month, year } = req.query;
    const filter = {};
    if (month) filter.month = parseInt(month);
    if (year) filter.year = parseInt(year);

    const budgets = await Budget.find(filter);

    // Calculate spent amounts for each budget
    const budgetsWithSpent = await Promise.all(
      budgets.map(async (budget) => {
        const startDate = new Date(budget.year, budget.month - 1, 1);
        const endDate = new Date(budget.year, budget.month, 0, 23, 59, 59);

        const transactions = await Transaction.find({
          category: budget.category,
          amount: { $lt: 0 },
          createdAt: { $gte: startDate, $lte: endDate }
        });

        const spent = transactions.reduce((acc, t) => acc + Math.abs(t.amount), 0);

        return {
          ...budget.toObject(),
          spent
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: budgetsWithSpent.length,
      data: budgetsWithSpent
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc    Add budget
// @route   POST /api/v1/budgets
// @access  Public
exports.addBudget = async (req, res, next) => {
  try {
    const { category, limit, month, year } = req.body;

    // Upsert: update if exists, create if not
    const budget = await Budget.findOneAndUpdate(
      { category, month, year },
      { category, limit, month, year },
      { new: true, upsert: true, runValidators: true }
    );

    return res.status(201).json({
      success: true,
      data: budget
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
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

// @desc    Delete budget
// @route   DELETE /api/v1/budgets/:id
// @access  Public
exports.deleteBudget = async (req, res, next) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({
        success: false,
        error: 'No budget found'
      });
    }

    await Budget.findByIdAndDelete(req.params.id);

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
