import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { taskAPI } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskAPI.getTasks({
        status: statusFilter === "all" ? undefined : statusFilter,
        category: categoryFilter === "all" ? undefined : categoryFilter,
        search: searchQuery || undefined,
      });
      setTasks(response.data.tasks);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks on component mount and when filters change
  useEffect(() => {
    fetchTasks();
  }, [statusFilter, categoryFilter, searchQuery]);

  // Handle creating/updating task
  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        await taskAPI.updateTask(editingTask._id, taskData);
        setSuccessMessage("Task updated successfully");
      } else {
        await taskAPI.createTask(taskData);
        setSuccessMessage("Task created successfully");
      }
      setShowForm(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save task");
    }
  };

  // Handle deleting task
  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await taskAPI.deleteTask(id);
        setSuccessMessage("Task deleted successfully");
        fetchTasks();
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete task");
      }
    }
  };

  // Handle toggling task status
  const handleToggleTask = async (id) => {
    try {
      await taskAPI.toggleTask(id);
      setSuccessMessage("Task status updated");
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
    }
  };

  // Handle editing task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // Handle closing form
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Clear success message
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Task Manager</h1>
          <div className="header-actions">
            <span className="user-info">Hello, {user?.name}</span>
            <button onClick={handleLogout} className="btn-secondary btn-small">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-content">
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="dashboard-controls">
            <div className="controls-left">
              <input
                type="text"
                placeholder="Search tasks..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="general">General</option>
              </select>
            </div>

            <button
              onClick={() => {
                setEditingTask(null);
                setShowForm(true);
              }}
              className="btn-primary"
            >
              + Add Task
            </button>
          </div>

          {showForm && (
            <TaskForm
              onSubmit={handleSaveTask}
              onCancel={handleCloseForm}
              initialData={editingTask}
            />
          )}

          {loading && (
            <div className="flex-center mt-3">
              <div className="spinner"></div>
            </div>
          )}

          {!loading && tasks.length === 0 && (
            <div className="empty-state">
              <h3>No tasks yet</h3>
              <p>Create your first task to get started</p>
            </div>
          )}

          {!loading && tasks.length > 0 && (
            <TaskList
              tasks={tasks}
              onToggle={handleToggleTask}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          )}
        </div>
      </main>
    </div>
  );
}
