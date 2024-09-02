import axios from "axios";

// Set up the base URL for your API
const api = axios.create({
  baseURL: "http://localhost:5027/api/Tasks", // Ensure this matches the URL of your backend API
});

// Function to get all tasks
export const getTasks = async () => {
  try {
    return await api.get("/");
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Function to add a new task
export const addTask = async (task) => {
  try {
    return await api.post("/", task);
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

// Function to update a task
export const updateTask = async (id, updatedTask) => {
  try {
    return await api.put(`/${id}`, updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Function to delete a task
export const deleteTask = async (id) => {
  try {
    return await api.delete(`/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
