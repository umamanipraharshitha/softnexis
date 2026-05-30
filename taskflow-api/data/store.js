/** In-memory data store (replace with database in a later task) */

let tasks = [
  {
    id: 1700000000000,
    text: "Learn JavaScript",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 1700000000001,
    text: "Build portfolio",
    completed: true,
    createdAt: new Date().toISOString(),
  },
];

function getAllTasks() {
  return tasks;
}

function getTaskById(id) {
  return tasks.find((t) => t.id === id);
}

function createTask(task) {
  tasks.unshift(task);
  return task;
}

function updateTask(id, updates) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;
  tasks[index] = { ...tasks[index], ...updates, id };
  return tasks[index];
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
