const Project = require("../models/Project");

// Create Project
exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.create({
      title,
      description,
      userId: req.user.id,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: "Error creating project",
      error: error.message,
    });
  }
};

// Get All Projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { userId: req.user.id }, // IMPORTANT
    });
     res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching projects",
      error: error.message,
    });
  }
};
