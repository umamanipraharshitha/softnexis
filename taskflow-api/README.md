# TaskFlow API

RESTful backend service for task management — built for **TaskFlow Lite**.

## Architecture

```text
TaskFlow Lite (Client)
        ↓
TaskFlow API (Node.js + Express)
        ↓
Routes → Controllers → Middleware → In-Memory Data Store
```

## Project Structure

```text
taskflow-api/
  server.js              — App entry point
  package.json
  routes/
    tasks.js             — Task endpoints
  controllers/
    tasksController.js   — CRUD logic
  middleware/
    errorHandler.js      — 404 + global errors
    validateTask.js      — Input validation
  data/
    store.js             — In-memory store
  README.md
  TaskFlow-API.postman_collection.json
```

## Dependencies

```bash
npm install express cors morgan helmet
```

## How to Run

```bash
cd taskflow-api
npm install
npm start
```

Server runs at: `http://localhost:3000`

Dev mode (auto-restart):

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|--------------|
| GET | `/api/tasks` | Get all tasks | 200, 500 |
| GET | `/api/tasks/:id` | Get single task | 200, 404 |
| POST | `/api/tasks` | Create new task | 201, 400 |
| PUT | `/api/tasks/:id` | Update task | 200, 404 |
| DELETE | `/api/tasks/:id` | Delete task | 204, 404 |

### Request / Response Examples

**Create task**

```http
POST /api/tasks
Content-Type: application/json

{ "text": "Learn Node.js" }
```

**Update task**

```http
PUT /api/tasks/1700000000000
Content-Type: application/json

{ "text": "Learn Express", "completed": true }
```

**Success response shape**

```json
{
  "success": true,
  "data": {
    "id": 1700000000000,
    "text": "Learn JavaScript",
    "completed": false,
    "createdAt": "2026-05-30T12:00:00.000Z"
  }
}
```

## Testing

Import `TaskFlow-API.postman_collection.json` into Postman or Thunder Client and run the collection against `http://localhost:3000`.

## Related Project

Frontend: [TaskFlow Lite on GitHub](https://github.com/umamanipraharshitha/softnexis/tree/main/taskflow-lite)
