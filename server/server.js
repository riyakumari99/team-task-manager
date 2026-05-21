const express = require("express");
const cors = require("cors");
require("dotenv").config();

// DB connection
const sequelize = require("./config/db");

// Models (IMPORTANT: ensures relationships run)
require("./models");

// Routes
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Home route (test API)
app.get("/", (req, res) => {
  res.send("Team Task Manager API is Running 🚀");
});

// DB Connection check
sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL Connected");
  })
  .catch((err) => {
    console.log("DB Connection Error:", err);
  });

// Sync DB
sequelize
  .sync()
  .then(() => {
    console.log("Tables Created / Synced");
  })
  .catch((err) => {
    console.log("Sync Error:", err);
  });

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});