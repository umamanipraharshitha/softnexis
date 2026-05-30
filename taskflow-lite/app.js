import { loadTasks, saveTasks } from "./modules/storage.js";
import {
  renderTaskList,
  renderStats,
  showError,
  updateCharCount,
} from "./modules/render.js";
import { validateTaskInput } from "./modules/validation.js";

let tasks = loadTasks();
let currentFilter = "all";

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const statsBar = document.getElementById("stats-bar");
const errorBox = document.getElementById("error-box");
const charCount = document.getElementById("char-count");
const filterButtons = document.querySelectorAll(".filter-btn");

function createTask(text) {
  return {
    id: Date.now(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

function getFilteredTasks() {
  if (currentFilter === "active") {
    return tasks.filter((t) => !t.completed);
  }
  if (currentFilter === "completed") {
    return tasks.filter((t) => t.completed);
  }
  return tasks;
}

function refreshUI() {
  renderTaskList(taskList, getFilteredTasks());
  renderStats(statsBar, tasks);
}

function persistAndRender() {
  saveTasks(tasks);
  refreshUI();
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const result = validateTaskInput(taskInput.value);

  if (!result.valid) {
    showError(errorBox, result.message);
    return;
  }

  tasks.unshift(createTask(result.value));
  taskInput.value = "";
  updateCharCount(charCount, "");
  showError(errorBox, "");
  persistAndRender();
  taskInput.focus();
});

taskInput.addEventListener("input", () => {
  updateCharCount(charCount, taskInput.value);
  if (errorBox.textContent) {
    showError(errorBox, "");
  }
});

taskList.addEventListener("click", (e) => {
  const taskElement = e.target.closest(".task");
  if (!taskElement) return;

  const id = Number(taskElement.dataset.id);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return;

  if (e.target.classList.contains("delete-btn")) {
    const confirmed = confirm("Delete this task permanently?");
    if (!confirmed) return;
    tasks.splice(index, 1);
    persistAndRender();
    return;
  }

  if (e.target.classList.contains("edit-btn")) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText === null) return;
    const result = validateTaskInput(newText);
    if (!result.valid) {
      showError(errorBox, result.message);
      return;
    }
    tasks[index].text = result.value;
    showError(errorBox, "");
    persistAndRender();
    return;
  }

  if (e.target.type === "checkbox") {
    tasks[index].completed = e.target.checked;
    taskElement.classList.toggle("completed", tasks[index].completed);
    saveTasks(tasks);
    renderStats(statsBar, tasks);
    if (currentFilter !== "all") {
      refreshUI();
    }
  }
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    refreshUI();
  });
});

refreshUI();
updateCharCount(charCount, "");
