# TaskFlow Lite

Your client-side task management solution — vanilla JavaScript, no frameworks.

## Project Structure

```text
taskflow-lite/
  index.html
  app.js                 — Main entry (controller)
  styles/
    main.css             — Core styling
    utilities.css        — Helper classes
  modules/
    storage.js           — localStorage abstraction
    render.js            — DOM rendering
    validation.js        — Form validation
  images/                — Assets (optional)
  README.md
```

## Features

- **CRUD:** Add, list, toggle complete, edit, delete tasks
- **Persistence:** Saves to `localStorage` automatically
- **Filters:** All / Active / Completed
- **Validation:** Empty input blocked, 120 char limit, live feedback
- **UI:** Task counter, empty state, responsive layout

## Data Structure

```javascript
{
  id: 1700000000000,
  text: "Learn JavaScript",
  completed: false,
  createdAt: "2026-05-30T12:00:00.000Z"
}
```

## How to Run

1. Open `index.html` in a browser, or use Live Server.
2. Add tasks, toggle completion, filter, edit, and delete.
3. Refresh the page — tasks persist via localStorage.

## Tech Stack

- HTML5
- CSS3 (Flexbox)
- Vanilla JavaScript (ES6 modules)
