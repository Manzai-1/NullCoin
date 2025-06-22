import express from 'express';
import {
  addTransaction,
  getWalletInfo,
  listAllTransactions,
  mineTransactions,
} from '../controllers/transaction-controller.mjs';
import { authenticateToken } from '../middleware/authenticateToken.mjs';
import { authorizeRole } from '../middleware/authorizeRole.mjs';

const router = express.Router();

router.route('/transactions')
  .post(authenticateToken, addTransaction)
  .get(authenticateToken, listAllTransactions);

router.route('/transactions/mine')
  .get(authenticateToken, mineTransactions);

router.route('/info')
  .get(authenticateToken, getWalletInfo);

export default router;
