import axios from "axios";

const API = "http://127.0.0.1:5000/api/projects";

// GET all projects
export const getProjects = () => {
  return axios.get(API);
};

// CREATE project
export const createProject = (data) => {
  return axios.post(API, data);
};