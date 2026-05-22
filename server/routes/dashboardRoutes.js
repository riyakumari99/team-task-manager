const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/temp");
const roleMiddleware = require("../middleware/roleMiddleware");

const { getDashboard } = require("../controllers/dashboardController");

// 🔐 Admin + Member can view dashboard
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["Admin", "Member"]),
  getDashboard
);

module.exports = router;