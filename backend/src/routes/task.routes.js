import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { listTasks, createTask, updateTask, deleteTask, toggleTask } from '../controllers/task.controller.js';

const router = Router();

router.use(authRequired);
router.get('/', listTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.post('/:id/toggle', toggleTask);

export default router;
