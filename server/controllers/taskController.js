const Task = require("../models/Task");

// GET TASKS
const getTasks = async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
};

// CREATE TASK
const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
};

// UPDATE TASK
const updateTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  await task.update(req.body);
  res.json(task);
};

// DELETE TASK
const deleteTask = async (req, res) => {
  await Task.destroy({ where: { id: req.params.id } });
  res.json({ message: "Deleted" });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};