const Task = require("../models/Task");

exports.getDashboard = async (req, res) => {
  try {
    const totalTasks = await Task.count();

    const completedTasks = await Task.count({
      where: { status: "Completed" }
    });

    const pendingTasks = await Task.count({
      where: { status: "Pending" }
    });

    const inProgressTasks = await Task.count({
      where: { status: "In Progress" }
    });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};