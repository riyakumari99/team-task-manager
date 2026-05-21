const sequelize = require("../config/db");

const User = require("./User");
const Project = require("./Project");
const Task = require("./Task");

// =====================
// RELATIONSHIPS
// =====================

// User → Projects
User.hasMany(Project, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Project.belongsTo(User, {
  foreignKey: "userId",
});

// Project → Tasks
Project.hasMany(Task, {
  foreignKey: "projectId",
  onDelete: "CASCADE",
});

Task.belongsTo(Project, {
  foreignKey: "projectId",
});

module.exports = {
  sequelize,
  User,
  Project,
  Task,
};