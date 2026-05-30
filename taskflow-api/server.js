const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const tasksRouter = require("./routes/tasks");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Security & parsing
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "TaskFlow API is running" });
});

// API routes
app.use("/api/tasks", tasksRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`TaskFlow API listening on http://localhost:${PORT}`);
});
