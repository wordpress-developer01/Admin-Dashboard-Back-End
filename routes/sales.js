import express from 'express';
import { getTransactions } from '../controllers/sales.js';

const router = express.Router();

// GET /sales/transactions?page=1&pageSize=10
router.get('/transactions', getTransactions);

export default router;