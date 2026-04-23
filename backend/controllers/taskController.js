import Task from "../models/Task.js";

// @route   GET /api/tasks
// @desc    Get all tasks for logged-in user
// @access  Private
export const getTasks = async (req, res, next) => {
  try {
    const { status, category, search } = req.query;

    // Build filter object
    const filter = { userId: req.user.id };

    if (status) {
      filter.status = status;
    }

    if (category && category !== "all") {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
export const createTask = async (req, res, next) => {
  try {
    const { title, description, category, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Please provide a task title",
      });
    }

    const task = await Task.create({
      title,
      description: description || "",
      category: category || "general",
      dueDate: dueDate || null,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
export const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Verify ownership
    if (task.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this task",
      });
    }

    // Update fields
    const { title, description, status, category, dueDate } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (category !== undefined) task.category = category;
    if (dueDate !== undefined) task.dueDate = dueDate;

    task = await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Verify ownership
    if (task.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this task",
      });
    }

    await Task.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route   PATCH /api/tasks/:id/toggle
// @desc    Toggle task status
// @access  Private
export const toggleTaskStatus = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Verify ownership
    if (task.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this task",
      });
    }

    // Toggle status
    task.status = task.status === "completed" ? "pending" : "completed";
    task = await task.save();

    res.status(200).json({
      success: true,
      message: "Task status updated",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
