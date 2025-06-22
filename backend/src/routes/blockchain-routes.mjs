import { Router } from 'express';
import {
  addBlock,
  listAllBlocks,
} from '../controllers/blockchain-controllers.mjs';
import { authenticateToken } from '../middleware/authenticateToken.mjs';
import { authorizeRole } from '../middleware/authorizeRole.mjs';

const router = Router();

router.route('/').get(listAllBlocks);
router.route('/mine')
  .post(authenticateToken, authorizeRole('miner, admin'), addBlock);

export default router;
