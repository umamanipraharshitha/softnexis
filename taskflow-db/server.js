require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./db/connect");
const tasksRouter = require("./routes/tasks");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskFlow DB API is running",
    database: "MongoDB Atlas",
  });
});

app.use("/api/tasks", tasksRouter);

app.use(notFound);
app.use(errorHandler);

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`TaskFlow DB listening on http://localhost:${PORT}`);
  });
}

startServer();
