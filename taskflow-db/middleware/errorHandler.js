function notFound(req, res, next) {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

function handleDBError(res, error) {
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors)
      .map((e) => e.message)
      .join(", ");
    return res.status(400).json({ success: false, error: message });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ success: false, error: "Invalid id format." });
  }

  return res.status(500).json({
    success: false,
    error: "Database operation failed.",
  });
}

function errorHandler(err, req, res, next) {
  console.error(err.stack || err.message);

  if (err.name === "ValidationError" || err.name === "CastError") {
    return handleDBError(res, err);
  }

  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
}

module.exports = { notFound, errorHandler, handleDBError };
