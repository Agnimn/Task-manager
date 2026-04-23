import React from "react";
import "../styles/taskList.css";

export default function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className={`task-card task-${task.status}`}>
          <div className="task-header">
            <div className="task-checkbox">
              <input
                type="checkbox"
                checked={task.status === "completed"}
                onChange={() => onToggle(task._id)}
              />
            </div>
            <div className="task-title-section">
              <h3
                className={task.status === "completed" ? "task-completed" : ""}
              >
                {task.title}
              </h3>
              <p className="task-description">
                {task.description || "No description"}
              </p>
            </div>
            <div className="task-category">
              <span className="badge badge-category">{task.category}</span>
            </div>
          </div>

          <div className="task-footer">
            <div className="task-meta">
              <span
                className={`task-status badge ${
                  task.status === "completed"
                    ? "badge-success"
                    : "badge-pending"
                }`}
              >
                {task.status === "completed" ? "Completed" : "Pending"}
              </span>
              <span
                className={`task-date ${isOverdue(task.dueDate) && task.status === "pending" ? "overdue" : ""}`}
              >
                📅 {formatDate(task.dueDate)}
              </span>
            </div>

            <div className="task-actions">
              <button
                onClick={() => onEdit(task)}
                className="btn-secondary btn-small"
                title="Edit task"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="btn-danger btn-small"
                title="Delete task"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
