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

## 🌐 Deployment Guide

### Backend Deployment (Render)

1. **Push code to GitHub**
2. **Create Render account** at https://render.com
3. **Create new Web Service**
   - Connect GitHub repo
   - Select backend folder
   - Build command: `npm install`
   - Start command: `npm start`
4. **Add environment variables**:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT`
   - `NODE_ENV=production`
   - `FRONTEND_URL=your-frontend-url`
5. **Deploy**

### Frontend Deployment (Vercel)

1. **Push code to GitHub**
2. **Import project in Vercel**:
   - Go to https://vercel.com
   - Import from GitHub
   - Select frontend folder
3. **Add environment variables**:
   - `VITE_API_URL=your-backend-url`
4. **Deploy**

### Database (MongoDB Atlas)

1. **Create account** at https://www.mongodb.com/cloud/atlas
2. **Create cluster**
3. **Get connection string**
4. **Update MONGO_URI** in backend `.env`

---

## 🧪 Testing with Postman

### Setup

1. **Import API collection** (optional):
   - Create new collection
   - Add requests for each endpoint

### Test Workflow

1. **Sign Up**:

   ```
   POST: http://localhost:5000/api/auth/signup
   Body (raw JSON):
   {
     "name": "Test User",
     "email": "test@example.com",
     "password": "password123",
     "passwordConfirm": "password123"
   }
   ```

2. **Copy token from response**

3. **Set up Authorization**:
   - Go to "Authorization" tab
   - Select "Bearer Token"
   - Paste token

4. **Create Task**:

   ```
   POST: http://localhost:5000/api/tasks
   Body (raw JSON):
   {
     "title": "Test Task",
     "description": "Testing the API",
     "category": "general",
     "dueDate": "2024-04-30"
   }
   ```

5. **Get All Tasks**:

   ```
   GET: http://localhost:5000/api/tasks
   ```

6. **Toggle Task** (use task ID from response):
   ```
   PATCH: http://localhost:5000/api/tasks/{task_id}/toggle
   ```

---

## ❌ Troubleshooting

### Backend Issues

**MongoDB Connection Error**

- Ensure MongoDB is running locally OR MongoDB Atlas connection string is correct
- Check `MONGO_URI` in `.env`
- Verify firewall/network access

**Port Already in Use**

```bash
# Kill process on port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID {PID} /F

# Mac/Linux:
lsof -i :5000
kill -9 {PID}
```

**CORS Error**

- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check if frontend and backend are running

### Frontend Issues

**API Connection Error**

- Ensure backend is running on `http://localhost:5000`
- Check `VITE_API_URL` in `.env`
- Open browser console for error details

**Token Expiration**

- Token expires after 7 days (set in `JWT_EXPIRE`)
- Re-login to get new token

**Port Already in Use**

```bash
# Kill process on port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID {PID} /F

# Mac/Linux:
lsof -i :5173
kill -9 {PID}
```

---

## 📝 Environment Variables Checklist

### Backend `.env`

- [ ] `MONGO_URI` - MongoDB connection string
- [ ] `JWT_SECRET` - Secret key for JWT
- [ ] `JWT_EXPIRE` - Token expiration time
- [ ] `PORT` - Server port (default: 5000)
- [ ] `NODE_ENV` - development or production
- [ ] `FRONTEND_URL` - Frontend URL for CORS

### Frontend `.env`

- [ ] `VITE_API_URL` - Backend API URL

---

## 🔐 Security Best Practices

1. **Never commit `.env`** - Add to `.gitignore`
2. **Use HTTPS** in production
3. **Strong JWT_SECRET** - Generate strong random string
4. **Update dependencies** - Run `npm audit` regularly
5. **Validate inputs** - Server-side validation is in place
6. **CORS configuration** - Only allow your frontend
7. **Database indexing** - Improve query performance

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🤝 Support

For issues, questions, or contributions:

1. Check the Troubleshooting section
2. Review the code comments
3. Check API documentation

---

## ✅ Checklist Before Deployment

- [ ] Backend `.env` configured
- [ ] Frontend `.env` configured
- [ ] MongoDB Atlas account created and connection string added
- [ ] Backend tested with Postman
- [ ] Frontend runs without errors
- [ ] All CRUD operations working
- [ ] Authentication working
- [ ] Task filtering and search working
- [ ] Responsive design tested on mobile
- [ ] Error handling tested
- [ ] Ready for Render and Vercel deployment

---

Built with ❤️ using MERN Stack
