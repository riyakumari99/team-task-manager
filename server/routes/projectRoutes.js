const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createProject,
  getProjects,
} = require("../controllers/projectController");

// =======================
// CREATE PROJECT (ADMIN ONLY)
// =======================
router.post(
  "/",
  auth,
  roleMiddleware(["Admin"]),
  createProject
);

// =======================
// GET PROJECTS (ADMIN + MEMBER)
// =======================
router.get(
  "/",
  auth,
  roleMiddleware(["Admin", "Member"]),
  getProjects
);

module.exports = router;