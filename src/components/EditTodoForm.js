import { useState } from "react";
import React from "react";

const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.name);
  const [deadline, setDeadline] = useState(task.deadline);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.length <= 10) {
      alert("Task description must be longer than 10 characters.");
      return;
    }
    editTodo({
      name: value,
      deadline,
      id: task.id,
    });
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="Update Task"
        onChange={(e) => setValue(e.target.value)}
      />
      <input
        type="date"
        className="todo-deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit" className="todo-btn">
        Update Task
      </button>
    </form>
  );
};

export default EditTodoForm;
