import express from 'express';

import { getUser, loginUser, signupUser, updateUser } from '../controllers/userControllers.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';


const router = express.Router();


router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/getUser', authenticateToken, getUser);
router.put('/updateUser', authenticateToken, updateUser);


export default router;