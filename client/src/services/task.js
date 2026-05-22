import axios from "axios";

const API = "http://127.0.0.1:5000/api/tasks";

// GET tasks
export const getTasks = () => {
  return axios.get(API);
};

// CREATE task
export const createTask = (data) => {
  return axios.post(API, data);
};

// DELETE task
export const deleteTask = (id) => {
  return axios.delete(`${API}/${id}`);
};

// UPDATE task
export const updateTask = (id, data) => {
  return axios.put(`${API}/${id}`, data);
};