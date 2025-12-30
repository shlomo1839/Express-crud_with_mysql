import express from 'express';
import * as ctrl from '../controllers/taskController.js'

const router = express.Router();

//  routers of crud
router.route('/')
    .get(ctrl.getAllTasks)
    .post(ctrl.createTask)

router.route('/:id')
    .get(ctrl.getTaskById)
    .put(ctrl.updateTask)
    .delete(ctrl.deleteTask)

router.get('./stats', ctrl.getStats)
router.get('./search', ctrl.searchTasks)

export default router;
