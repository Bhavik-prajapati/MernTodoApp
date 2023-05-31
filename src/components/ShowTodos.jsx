import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Todo-card.css";
const ShowTodos = () => {
  const userId = sessionStorage.getItem("userId");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/todos/${userId}`
        );
        setTodos(response.data);
      } catch (err) {
        console.error("Error fetching todos:", err.message);
      }
    };
    fetchTodos();
  }, [userId]);

  return (
    <>
      <div className="todo-card">
        <h2>Todos</h2>
        {todos.length === 0 ? (
          <p>No todos found.</p>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li key={todo._id}>
                <h3>{todo.title}</h3>
                <p>Completed: {todo.completed ? "Yes" : "No"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ShowTodos;
