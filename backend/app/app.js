import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from '../routes/user.route.js';
import groupRouter from '../routes/group.route.js';
import expenseRouter from '../routes/expense.route.js';

// Create the app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // 👈 specify your frontend origin here (not '*')
    credentials: true,               // 👈 allow cookies to be sent
}));



app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.use('/api/users', userRouter);
app.use('/api/groups', groupRouter);
app.use('/api/expenses', expenseRouter);

// Export the app
export default app;
