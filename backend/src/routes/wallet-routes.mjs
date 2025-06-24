import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken.mjs';
import { authorizeRole } from '../middleware/authorizeRole.mjs';
import { addTransaction, getWalletHistory, getWalletInfo } from '../controllers/wallet-controllers.mjs';

const router = express.Router();

router.route('/')
  .get(authenticateToken, getWalletInfo)
  .post(authenticateToken, addTransaction);

router.route('/history')
  .get(authenticateToken, getWalletHistory);

export default router;
