import express from 'express';

import { authenticateToken } from '../middlewares/authMiddleware.js';
import { countTasks, createTask, deleteTask, filterTasks, getTask, updateTask } from '../controllers/taskControllers.js';


const router = express.Router();


router.post('/create', authenticateToken, createTask);
router.put('/update/:taskId', authenticateToken, updateTask);
router.delete('/delete/:taskId', authenticateToken, deleteTask);
router.get('/getTask/:taskId', getTask);
router.post('/filterTasks', authenticateToken, filterTasks);
router.get('/countTasks', authenticateToken, countTasks);


export default router;