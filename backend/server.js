import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import expenseRoutes from './routes/expense.route.js';
import { connectDB } from './config/db.js';

dotenv.config();
const app = express();


app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('server started at http://localhost:'+PORT);
});