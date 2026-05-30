const MAX_LENGTH = 120;

function validateCreateTask(req, res, next) {
  const { text } = req.body;

  if (text === undefined || text === null) {
    return res.status(400).json({
      success: false,
      error: "Task text is required.",
    });
  }

  if (typeof text !== "string" || text.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: "Task text cannot be empty.",
    });
  }

  if (text.trim().length > MAX_LENGTH) {
    return res.status(400).json({
      success: false,
      error: `Task text must be ${MAX_LENGTH} characters or less.`,
    });
  }

  req.body.text = text.trim();
  next();
}

function validateUpdateTask(req, res, next) {
  const { text, completed } = req.body;

  if (text !== undefined) {
    if (typeof text !== "string" || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Task text cannot be empty.",
      });
    }
    if (text.trim().length > MAX_LENGTH) {
      return res.status(400).json({
        success: false,
        error: `Task text must be ${MAX_LENGTH} characters or less.`,
      });
    }
    req.body.text = text.trim();
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({
      success: false,
      error: "Completed must be a boolean value.",
    });
  }

  if (text === undefined && completed === undefined) {
    return res.status(400).json({
      success: false,
      error: "Provide text and/or completed to update.",
    });
  }

  next();
}

function validateTaskId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({
      success: false,
      error: "Invalid task id.",
    });
  }
  req.params.id = id;
  next();
}

module.exports = { validateCreateTask, validateUpdateTask, validateTaskId };
