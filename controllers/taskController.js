import Task from "../models/taskModel.js";

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
    res.json({ success: true, count: tasks.length, data: tasks });
  } catch (err) { next(err); } //error handling?
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json({ success: true, data: task });
  } catch (err) { next(err); } //error handling?
};

export const createTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Title is required' });

    const insertId = await Task.create(req.body);
    const newTask = await Task.findById(insertId);
    res.status(201).json({ success: true, data: newTask });
  } catch (err) { next(err); }
};

export const updateTask = async (req, res, next) => {
  try {
    const success = await Task.update(req.params.id, req.body);
    if (!success) return res.status(404).json({ success: false, message: 'Task not found' });
    const updated = await Task.findById(req.params.id);
    res.json({ success: true, data: updated });
  } catch (err) { next(err); }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    const success = await Task.delete(req.params.id);
    if (!success) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json({ success: true, message: 'Deleted successfully', data: task });
  } catch (err) { next(err); }
};

export const searchTasks = async (req, res, next) => {
  try {
    const { q } = req.query;
    const tasks = await Task.search(q || '');
    res.json({ success: true, data: tasks });
  } catch (err) { next(err); }
};

export const getStats = async (req, res, next) => {
  try {
    const stats = await Task.getStats();
    res.json({ success: true, data: stats });
  } catch (err) { next(err); }
};