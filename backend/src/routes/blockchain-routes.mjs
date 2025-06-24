import { Router } from 'express';
import { listAllBlocks } from '../controllers/blockchain-controllers.mjs';
import { authenticateToken } from '../middleware/authenticateToken.mjs';
import { authorizeRole } from '../middleware/authorizeRole.mjs';

const router = Router();

router.route('/').get(listAllBlocks);
router.route('/backup').get(listAllBlocks);

export default router;
