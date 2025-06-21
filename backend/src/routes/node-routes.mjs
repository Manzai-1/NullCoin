import express from 'express';
import { addNode, listNodes } from '../controllers/node-controller.mjs';
import { authenticateToken } from '../middleware/authenticateToken.mjs';
import { authorizeRole } from '../middleware/authorizeRole.mjs';

const router = express.Router();

router.route('/')
    .get(authenticateToken, authorizeRole('admin'), listNodes)
    .post(authenticateToken, authorizeRole('node'), addNode);

export default router;
