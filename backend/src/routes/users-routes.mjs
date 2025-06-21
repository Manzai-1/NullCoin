import express from 'express';
import { addUser } from '../controllers/users-controller.mjs';

const router = express.Router();

router.route('/').post(addUser);

export default router;
