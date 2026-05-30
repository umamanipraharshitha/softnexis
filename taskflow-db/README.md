# TaskFlow DB

Cloud-powered data persistence for task management — MongoDB Atlas + Mongoose.

## Architecture

```text
TaskFlow Lite (Frontend)
        ↓
TaskFlow DB API (Express)
        ↓
MongoDB Atlas → tasks collection
```

## Project Structure

```text
taskflow-db/
  server.js
  package.json
  .env.example
  db/connect.js
  models/Task.js
  controllers/tasksController.js
  routes/tasks.js
  middleware/errorHandler.js
  README.md
```

## Dependencies

```bash
npm install mongoose mongodb dotenv express cors morgan helmet
```

## Setup (MongoDB Atlas)

1. Sign up at [MongoDB Atlas](https://cloud.mongodb.com).
2. Create an **M0 FREE** cluster.
3. Add your IP to **Network Access** (whitelist).
4. Create a database user with read/write privileges.
5. Copy the connection string.
6. Create `.env` from example:

```bash
cp .env.example .env
```

7. Set `MONGODB_URI` in `.env`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abc123.mongodb.net/taskflow?retryWrites=true&w=majority
```

## Run

```bash
npm install
npm start
```

Dev mode:

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/paginated?page=1&limit=10` | Paginated tasks |
| GET | `/api/tasks/search?q=javascript` | Full-text search |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create task `{ "text": "..." }` |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

## Mongoose Schema

- `text` — required, 3–255 chars, trimmed
- `completed` — boolean, default `false`
- `createdAt` — auto timestamp
- `lastModified` — updated on change
- Indexes: text search + `completed`

## Related Projects

- Frontend: [taskflow-lite](https://github.com/umamanipraharshitha/softnexis/tree/main/taskflow-lite)
- In-memory API: `../taskflow-api`
