import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";



export const Todo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
  const deadline = new Date(task.deadline);
  const isOverdue = deadline < new Date();

  return (
    <tr
      className={`todo-row ${isOverdue ? "overdue" : ""}`}
      style={{ backgroundColor: isOverdue ? "red" : "black" }}
    >
      <td>
        <p
          onClick={() => toggleComplete(task.id)}
          className={`${task.isCompleted ? "completed" : "incompleted"}`}
        >
          {task.name}
        </p>
      </td>
      <td>
        <p className="deadline">{deadline.toLocaleDateString()}</p>
      </td>
      <td>
        <div>
          <FontAwesomeIcon
            className="edit-icon"
            icon={faPenToSquare}
            onClick={() => editTodo(task.id)}
          />
          <FontAwesomeIcon
            className="delete-icon"
            icon={faTrash}
            onClick={() => deleteTodo(task.id)}
          />
        </div>
      </td>
    </tr>
  );
};

export default Todo;