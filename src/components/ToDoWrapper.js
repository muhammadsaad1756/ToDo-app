import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
import axios from "axios";

const API_URL = "http://localhost:5027/api/Tasks";

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState(null); // Add this line

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL);
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTodos();
  }, []);
  {
    /* 
  const addTodo = async (todo) => {
    try {
      const response = await axios.post(API_URL, todo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };*/
  }
  const addTodo = async (todo) => {
    const formattedTodo = {
      ...todo,
      deadline: new Date(todo.deadline).toISOString(),
    };

    console.log("Submitting task to backend:", formattedTodo);

    try {
      const response = await axios.post(API_URL, formattedTodo);
      setTodos([...todos, response.data]);
      setError(null); // Clear any existing errors
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Failed to add the task. Please try again."); // Set error state
    }
  };

  const toggleComplete = async (id) => {
    const todoToToggle = todos.find((todo) => todo.id === id);
    if (todoToToggle) {
      const updatedTodo = {
        ...todoToToggle,
        isCompleted: !todoToToggle.isCompleted,
      };

      try {
        await axios.put(`${API_URL}/${id}`, updatedTodo);
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
          )
        );
        setError(null); // Clear any existing errors
      } catch (error) {
        console.error("Error updating task:", error);
        setError("Failed to update the task. Please try again."); // Set error state
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
      setError(null); // Clear any existing errors
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete the task. Please try again."); // Set error state
    }
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = async ({ name, deadline, id }) => {
    try {
      const updatedTask = { name, deadline, id, isCompleted: false };
      await axios.put(`${API_URL}/${id}`, updatedTask);
      setTodos(
        todos.map((todo) =>
          todo.id === id
            ? { ...todo, name, deadline, isEditing: !todo.isEditing }
            : todo
        )
      );
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const filteredTodos = () => {
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.isCompleted);
      case "incomplete":
        return todos.filter((todo) => !todo.isCompleted);
      default:
        return todos;
    }
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("incomplete")}>Incomplete</button>
      </div>
      <table className="todo-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos().map((todo) =>
            todo.isEditing ? (
              <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
            ) : (
              <Todo
                task={todo}
                key={todo.id}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodoWrapper;
