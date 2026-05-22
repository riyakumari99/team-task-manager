const Project = require("./Project");
const Task = require("./Task");
const User = require("./User");

// Project → Tasks
Project.hasMany(Task, { foreignKey: "projectId" });
Task.belongsTo(Project, { foreignKey: "projectId" });

// User → Tasks
User.hasMany(Task, { foreignKey: "assignedTo" });
Task.belongsTo(User, { foreignKey: "assignedTo" });

module.exports = { Project, Task, User };