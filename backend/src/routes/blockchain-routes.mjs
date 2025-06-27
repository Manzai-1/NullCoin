import { Router } from 'express';
import { listAllBlocks } from '../controllers/blockchain-controllers.mjs';
import { authenticateToken } from '../middleware/authenticateToken.mjs';

const router = Router();

router.route('/').get(authenticateToken, listAllBlocks);

export default router;
