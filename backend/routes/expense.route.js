import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { 
    getExpenses, 
    addExpense, 
    updateExpense, 
    deleteExpense, 
    getExpenseTotals, 
    getExpensesByDateRange 
} from '../controllers/expense.controller.js';

const router = express.Router();

// Protect all expense routes
router.use(protect);

router.get('/', getExpenses);
router.post('/', addExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);
router.get('/totals', getExpenseTotals);
router.get('/date-range', getExpensesByDateRange);

export default router;
