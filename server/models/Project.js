const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Project = sequelize.define("Project", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },

  userId: {   // ✅ IMPORTANT FIX
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Project;