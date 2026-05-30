const express = require("express");
const controller = require("../controllers/tasksController");

const router = express.Router();

router.get("/search", controller.searchTasks);
router.get("/paginated", controller.getPaginatedTasks);
router.get("/", controller.getTasks);
router.get("/:id", controller.getTaskById);
router.post("/", controller.createTask);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);

module.exports = router;
