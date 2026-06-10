# TaskManager

A full-stack task management app with user authentication, protected task APIs, and a React dashboard for creating, editing, completing, and deleting tasks.

## Features

- User registration and login
- JWT-based authentication
- Protected task routes
- Create, read, update, and delete tasks
- Mark tasks as pending or completed
- Role-aware task access on the backend
- Request validation and centralized backend error handling
- React dashboard with loading and error states
- Swagger API docs endpoint

## Tech Stack

**Frontend**

- React
- Vite
- React Router
- Axios

**Backend**

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens
- bcryptjs
- express-validator
- Swagger UI

## Project Structure

```txt
TaskManager/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── validators/
├── frontend/
│   ├── package.json
│   └── src/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       └── main.jsx
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB running locally or a MongoDB Atlas connection string

### Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
JWT_SECRET=replace-with-a-long-random-secret
PORT=3001
```

Start the backend:

```bash
npm run dev
```

The API runs at:

```txt
http://localhost:3001
```

Swagger docs are available at:

```txt
http://localhost:3001/api-docs
```

### Frontend Setup

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at the URL printed by Vite, usually:

```txt
http://localhost:5173
```

## API Overview

Authentication:

```txt
POST /api/v1/auth/register
POST /api/v1/auth/login
```

Tasks:

```txt
GET    /api/v1/tasks
POST   /api/v1/tasks
GET    /api/v1/tasks/:id
PUT    /api/v1/tasks/:id
DELETE /api/v1/tasks/:id
```

Task routes require an `Authorization` header:

```txt
Authorization: Bearer <token>
```

## Smoke Test

After starting the backend, register a user:

```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Smoke Test","email":"smoke@example.com","password":"password123"}'
```

Login and save the token:

```bash
TOKEN=$(curl -s -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"smoke@example.com","password":"password123"}' \
  | node -pe "JSON.parse(require('fs').readFileSync(0, 'utf8')).token")
```

Create a task:

```bash
curl -X POST http://localhost:3001/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Smoke test task","description":"Created from curl"}'
```

List tasks:

```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/v1/tasks
```

## Available Scripts

Backend:

```bash
npm run dev
npm start
```

Frontend:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Environment Variables

Backend variables:

| Name | Description |
| --- | --- |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWT auth tokens |
| `PORT` | Backend server port. Defaults to `3001` |

Do not commit real `.env` files. Use placeholders in documentation or example files.

## Notes

- The frontend API client currently points to `http://localhost:3001/api/v1`.
- Build output, dependencies, environment files, and OS files are ignored by Git.
- The backend currently has no automated test suite configured.
