import express from 'express';
import {
	listAllTransactions,
	mineTransactions,
} from '../controllers/transaction-controller.mjs';
import { authenticateToken } from '../middleware/authenticateToken.mjs';
import { authorizeRole } from '../middleware/authorizeRole.mjs';

const router = express.Router();

router.route('/').get(authenticateToken, listAllTransactions);
router.route('/mine').get(authenticateToken, mineTransactions);

export default router;
