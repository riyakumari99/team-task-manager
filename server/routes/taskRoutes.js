const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/temp");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTaskStatus,
  deleteTask
} = require("../controllers/taskController");


// 🔐 CREATE TASK (Admin + Member)
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["Admin", "Member"]),
  createTask
);


// 🔐 GET TASKS BY PROJECT (Admin + Member)
router.get(
  "/project/:projectId",
  authMiddleware,
  roleMiddleware(["Admin", "Member"]),
  getTasksByProject
);


// 🔐 GET SINGLE TASK (Admin + Member)
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Member"]),
  getTaskById
);


// 🔐 UPDATE TASK STATUS (Admin + Member)
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Member"]),
  updateTaskStatus
);


// 🔴 DELETE TASK (ONLY ADMIN)
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin"]),
  deleteTask
);

module.exports = router;