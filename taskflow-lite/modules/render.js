function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

export function renderTaskList(taskListElement, tasks) {
  taskListElement.innerHTML = "";

  if (tasks.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.innerHTML = `
      <div class="empty-icon" aria-hidden="true">📋</div>
      <p>No tasks yet</p>
      <span>Add your first task above!</span>
    `;
    taskListElement.appendChild(empty);
    return;
  }

  tasks.forEach((task) => {
    const taskElement = document.createElement("li");
    taskElement.className = "task" + (task.completed ? " completed" : "");
    taskElement.dataset.id = task.id;

    taskElement.innerHTML = `
      <label class="task-label">
        <input type="checkbox" ${task.completed ? "checked" : ""} aria-label="Mark complete" />
        <span class="task-text">${escapeHTML(task.text)}</span>
      </label>
      <div class="task-actions">
        <button type="button" class="edit-btn" aria-label="Edit task">✏️</button>
        <button type="button" class="delete-btn" aria-label="Delete task">🗑️</button>
      </div>
    `;

    taskListElement.appendChild(taskElement);
  });
}

export function renderStats(statsElement, tasks) {
  const total = tasks.length;
  const active = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;

  statsElement.innerHTML = `
    <span><strong>${total}</strong> total</span>
    <span><strong>${active}</strong> active</span>
    <span><strong>${completed}</strong> done</span>
  `;
}

export function showError(errorElement, message) {
  errorElement.textContent = message;
  errorElement.hidden = !message;
}

export function updateCharCount(countElement, text) {
  countElement.textContent = `${text.length}/120`;
  countElement.classList.toggle("near-limit", text.length >= 110);
}
