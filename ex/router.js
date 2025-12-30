import express from 'express';
import * as ctrl from '../controllers/taskController.js';

const router = express.Router();

// נתיבים מיוחדים
router.get('/stats', ctrl.getStats);
router.get('/search', ctrl.searchTasks);

// נתיבי CRUD
router.route('/')
  .get(ctrl.getAllTasks)
  .post(ctrl.createTask);

router.route('/:id')
  .get(ctrl.getTaskById)
  .put(ctrl.updateTask)
  .delete(ctrl.deleteTask);

export default router;