import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { addExpense, getExpenses } from '../controller/expense.controller.js';
const expenseRouter = express.Router();


expenseRouter.post('/:groupId', protect, addExpense);
expenseRouter.get('/:groupId', protect, getExpenses);


export default expenseRouter;