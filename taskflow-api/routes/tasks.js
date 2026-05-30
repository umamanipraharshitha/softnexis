const express = require("express");
const controller = require("../controllers/tasksController");
const {
  validateCreateTask,
  validateUpdateTask,
  validateTaskId,
} = require("../middleware/validateTask");

const router = express.Router();

router.get("/", controller.getAllTasks);
router.get("/:id", validateTaskId, controller.getTaskById);
router.post("/", validateCreateTask, controller.createTask);
router.put("/:id", validateTaskId, validateUpdateTask, controller.updateTask);
router.delete("/:id", validateTaskId, controller.deleteTask);

module.exports = router;
