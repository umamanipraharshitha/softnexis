const Task = require("../models/Task");
const { handleDBError } = require("../middleware/errorHandler");

async function getTasks(req, res) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }).lean();
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    handleDBError(res, error);
  }
}

async function getPaginatedTasks(req, res) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const [tasks, count] = await Promise.all([
      Task.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Task.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      data: {
        tasks,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalTasks: count,
      },
    });
  } catch (error) {
    handleDBError(res, error);
  }
}

async function searchTasks(req, res) {
  try {
    const q = req.query.q;
    if (!q || q.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Search query ?q= is required.",
      });
    }

    const results = await Task.find(
      { $text: { $search: q } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .lean();

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    handleDBError(res, error);
  }
}

async function getTaskById(req, res) {
  try {
    const task = await Task.findById(req.params.id).lean();
    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found." });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    handleDBError(res, error);
  }
}

async function createTask(req, res) {
  try {
    const task = new Task({ text: req.body.text });
    const saved = await task.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    handleDBError(res, error);
  }
}

async function updateTask(req, res) {
  try {
    const updates = { lastModified: Date.now() };
    if (req.body.text !== undefined) updates.text = req.body.text;
    if (req.body.completed !== undefined) updates.completed = req.body.completed;

    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).lean();

    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found." });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    handleDBError(res, error);
  }
}

async function deleteTask(req, res) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: "Task not found." });
    }
    res.status(204).send();
  } catch (error) {
    handleDBError(res, error);
  }
}

module.exports = {
  getTasks,
  getPaginatedTasks,
  searchTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
