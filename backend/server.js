import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000
const app = express();

const __dirname = path.resolve();

app.use(express.json());