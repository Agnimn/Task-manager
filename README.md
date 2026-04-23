# Task Manager MERN Stack Application

A full-stack Task Manager application built with MongoDB, Express, React (Vite), and Node.js featuring complete authentication, task management, and a modern UI.

## 📋 Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Installation & Setup](#installation--setup)
5. [Running the Application](#running-the-application)
6. [API Documentation](#api-documentation)
7. [Frontend Features](#frontend-features)
8. [Deployment Guide](#deployment-guide)
9. [Troubleshooting](#troubleshooting)

---

## ✨ Features

### ✅ Core Features

- **User Authentication**: Sign up, login, logout with JWT tokens
- **Task Management**: Create, read, update, delete tasks
- **Task Status**: Mark tasks as pending or completed
- **User Isolation**: Each user sees only their own tasks
- **Persistent Sessions**: Stay logged in across page refreshes

### 🎁 Bonus Features

- **Search Tasks**: Search tasks by title or description
- **Filter Tasks**: Filter by status (pending/completed)
- **Task Categories**: Organize tasks into categories (Work, Personal, Shopping, General)
- **Due Dates**: Set and view task due dates
- **Overdue Indicators**: Visual indicators for overdue tasks
- **Toast Notifications**: Success/error messages for user actions
- **Modern UI**: Clean, responsive design with dark/light theme support
- **Form Validation**: Client and server-side validation

---

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **CORS** - Cross-origin requests

### Frontend

- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Routing
- **Axios** - HTTP client
- **CSS3** - Styling (no UI libraries)

---

## 📁 Project Structure

```
task-manager/
│
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Auth logic (signup, login)
│   │   └── taskController.js    # Task CRUD operations
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   └── errorHandler.js      # Error handling middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Task.js              # Task schema
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   └── tasks.js             # Task routes
│   ├── .env.example             # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   └── server.js                # Main server file
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx    # Private route protection
│   │   │   ├── TaskForm.jsx          # Task creation/editing form
│   │   │   └── TaskList.jsx          # Task display list
│   │   ├── context/
│   │   │   └── AuthContext.jsx       # Authentication context
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx         # Login page
│   │   │   ├── SignupPage.jsx        # Signup page
│   │   │   └── DashboardPage.jsx     # Main dashboard
│   │   ├── styles/
│   │   │   ├── globals.css           # Global styles
│   │   │   ├── auth.css              # Auth pages styles
│   │   │   ├── dashboard.css         # Dashboard styles
│   │   │   ├── taskForm.css          # Form styles
│   │   │   └── taskList.css          # Task list styles
│   │   ├── utils/
│   │   │   └── api.js                # API client configuration
│   │   ├── App.jsx                   # Main app component
│   │   └── main.jsx                  # React entry point
│   ├── .env.example                  # Environment variables template
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v16+) and npm
- **MongoDB** (local or MongoDB Atlas)
- **Git**

### Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create `.env` file from template:**

   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (edit `.env`):

   ```
   MONGO_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your_super_secret_jwt_key_change_this
   JWT_EXPIRE=7d
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

   **For MongoDB Atlas**, use:

   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager?retryWrites=true&w=majority
   ```

### Frontend Setup

1. **Navigate to frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create `.env` file from template:**

   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (edit `.env`):
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

---

## 🎯 Running the Application

### Method 1: Using Separate Terminals

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

### Method 2: Using npm start (from project root)

Ensure both `package.json` files have dev scripts configured, then:

```bash
# Start backend
cd backend && npm run dev &

# Start frontend in new terminal
cd frontend && npm run dev
```

### Method 3: Production Build

**Backend:**

```bash
cd backend
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

---

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

#### Sign Up

```
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get Current User

```
GET /api/auth/me
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Task Endpoints

#### Get All Tasks (with filters)

```
GET /api/tasks?status=pending&category=work&search=query
Authorization: Bearer {token}

Query Parameters:
- status: "all" | "pending" | "completed" (default: "all")
- category: "all" | "work" | "personal" | "shopping" | "general"
- search: search string for title or description

Response (200):
{
  "success": true,
  "count": 5,
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "status": "pending",
      "category": "shopping",
      "dueDate": "2024-04-30",
      "userId": "507f1f77bcf86cd799439012",
      "createdAt": "2024-04-23T10:00:00Z",
      "updatedAt": "2024-04-23T10:00:00Z"
    }
  ]
}
```

#### Create Task

```
POST /api/tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the React dashboard",
  "category": "work",
  "dueDate": "2024-04-30"
}

Response (201):
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete project",
    "description": "Finish the React dashboard",
    "status": "pending",
    "category": "work",
    "dueDate": "2024-04-30",
    "userId": "507f1f77bcf86cd799439012",
    "createdAt": "2024-04-23T10:00:00Z",
    "updatedAt": "2024-04-23T10:00:00Z"
  }
}
```

#### Update Task

```
PUT /api/tasks/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed",
  "category": "work",
  "dueDate": "2024-04-30"
}

Response (200):
{
  "success": true,
  "message": "Task updated successfully",
  "task": { ... }
}
```

#### Toggle Task Status

```
PATCH /api/tasks/:id/toggle
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Task status updated",
  "task": { ... }
}
```

#### Delete Task

```
DELETE /api/tasks/:id
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## 🎨 Frontend Features

### Pages

1. **Login Page** (`/login`)
   - Email and password login
   - Form validation
   - Redirect to dashboard on success
   - Link to signup

2. **Signup Page** (`/signup`)
   - Name, email, password registration
   - Password confirmation
   - Form validation
   - Redirect to dashboard on success
   - Link to login

3. **Dashboard** (`/dashboard`)
   - View all user's tasks
   - Create new tasks
   - Edit existing tasks
   - Delete tasks
   - Toggle task status (completed/pending)
   - Search tasks
   - Filter by status and category
   - Responsive layout
   - Logout button

### Components

- **ProtectedRoute**: Prevents unauthorized access to dashboard
- **TaskForm**: Reusable form for creating/editing tasks
- **TaskList**: Displays tasks with actions
- **AuthContext**: Manages authentication state globally

### Styling Features

- Modern, clean design
- Responsive on mobile, tablet, desktop
- Gradient backgrounds
- Smooth transitions and hover effects
- Loading spinners
- Error and success alerts
- Dark/light theme ready

---

<img width="1913" height="913" alt="image" src="https://github.com/user-attachments/assets/a73a3c3d-b053-4268-92c6-7eceec06edf5" />
<img width="1919" height="896" alt="image" src="https://github.com/user-attachments/assets/f26d590e-3bd7-45d7-80f0-7043562a6e6a" />
<img width="1919" height="912" alt="image" src="https://github.com/user-attachments/assets/c93f29ce-2a45-4b8a-a74d-54c800d6212c" />
<img width="1919" height="848" alt="image" src="https://github.com/user-attachments/assets/2af341c5-0692-40a8-b928-612ceaf2853c" />
<img width="1918" height="909" alt="image" src="https://github.com/user-attachments/assets/da1b7b41-5f96-48e2-8786-2125892d8082" />
<img width="1919" height="905" alt="image" src="https://github.com/user-attachments/assets/1d6eae83-d418-46fd-9401-1f4cb68f4b1b" />







Built with ❤️ using MERN Stack
