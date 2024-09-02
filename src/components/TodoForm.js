import { useState } from "react";
import React from "react";

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.length <= 10) {
      alert("Task description must be longer than 10 characters.");
      return;
    }
    const newTask = {
      name: value,
      deadline: deadline || new Date().toISOString().split("T")[0],
    };
    console.log("Submitting task:", newTask); // Add this log
    addTodo(newTask);
    setValue("");
    setDeadline("");
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="What is the task today?"
        onChange={(e) => setValue(e.target.value)}
      />
      <input
        type="date"
        className="todo-deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
