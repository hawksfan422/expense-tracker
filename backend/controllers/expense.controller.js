import Expense from "../models/Expense.js";
// Get all expenses for logged in user
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    console.error('Error in getExpenses:', error);
    res.status(500).json({ message: error.message });
  }
};

// Add a new expense for logged in user
export const addExpense = async (req, res) => {
  try {
    const { name, category, amount, description } = req.body;
    const expense = await Expense.create({
      name,
      category,
      amount,
      description,
      user: req.user._id // Add user reference
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an expense (only if it belongs to logged in user)
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, amount, description } = req.body;
    
    const expense = await Expense.findOne({
      _id: id,
      user: req.user._id // Only find if it belongs to user
    });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expense.name = name || expense.name;
    expense.category = category || expense.category;
    expense.amount = amount || expense.amount;
    expense.description = description || expense.description;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an expense (only if it belongs to logged in user)
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOne({
      _id: id,
      user: req.user._id // Only find if it belongs to user
    });
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.deleteOne();
    res.json({ message: 'Expense removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get expense totals for logged in user
export const getExpenseTotals = async (req, res) => {
  try {
    const totals = await Expense.aggregate([
      {
        $match: { user: req.user._id } // Only aggregate user's expenses
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);
    res.json(totals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get expenses by date range for logged in user
export const getExpensesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const expenses = await Expense.find({
      user: req.user._id, // Only find user's expenses
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).sort({ date: -1 });
    
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};