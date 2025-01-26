import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import expenseRoutes from './routes/expense.route.js';
import authRoutes from './routes/auth.route.js'

import { connectDB } from './config/db.js';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/expenses', expenseRoutes);
app.use('/api/auth', authRoutes); 

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
  });

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('server started at http://localhost:'+PORT);
});