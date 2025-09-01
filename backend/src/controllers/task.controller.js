import Task from '../models/Task.js';

export async function listTasks(req, res, next) {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (e) { next(e); }
}

export async function createTask(req, res, next) {
  try {
    const { title, description, dueDate } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const task = await Task.create({ userId: req.user.id, title, description, dueDate });
    res.status(201).json(task);
  } catch (e) { next(e); }
}

export async function updateTask(req, res, next) {
  try {
    const { id } = req.params;
    const { title, description, completed, dueDate } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { $set: { title, description, completed, dueDate } },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (e) { next(e); }
}

export async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ ok: true });
  } catch (e) { next(e); }
}

export async function toggleTask(req, res, next) {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (e) { next(e); }
}
