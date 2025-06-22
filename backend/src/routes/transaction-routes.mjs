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
  .post(authenticateToken, authorizeRole('user, admin'), addTransaction)
  .get(authenticateToken, authorizeRole('user, admin'), listAllTransactions);

router.route('/transactions/mine')
  .get(authenticateToken, authorizeRole('miner, admin'), mineTransactions);

router.route('/info')
  .get(authenticateToken, getWalletInfo);

export default router;
