const store = require("../data/store");

function getAllTasks(req, res, next) {
  try {
    const tasks = store.getAllTasks();
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
}

function getTaskById(req, res, next) {
  try {
    const task = store.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found.",
      });
    }
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
}

function createTask(req, res, next) {
  try {
    const task = store.createTask({
      id: Date.now(),
      text: req.body.text,
      completed: false,
      createdAt: new Date().toISOString(),
    });
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
}

function updateTask(req, res, next) {
  try {
    const existing = store.getTaskById(req.params.id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        error: "Task not found.",
      });
    }

    const updates = {};
    if (req.body.text !== undefined) updates.text = req.body.text;
    if (req.body.completed !== undefined) updates.completed = req.body.completed;

    const task = store.updateTask(req.params.id, updates);
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
}

function deleteTask(req, res, next) {
  try {
    const removed = store.deleteTask(req.params.id);
    if (!removed) {
      return res.status(404).json({
        success: false,
        error: "Task not found.",
      });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
