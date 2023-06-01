import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowTodos from "../components/ShowTodos";
import "../components/Todo-card.css";
// import { withRouter } from "react-router-dom";

const TodoHome = () => {
  //   const searchParams = new URLSearchParams(location.search);

  const userId = sessionStorage.getItem("userId");
  // console.log(userId);

  const [currstate, setcurrstate] = useState(false);
  const [updatestate, setupdatestate] = useState(false);
  const [title, setTitle] = useState("");
  const [isupdating, setisupdating] = useState(false);
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const [idholder, setIdholder] = useState("");

  const handleDelete = async (id) => {
    // Filter out the todo item with the provided id
    //  const updatedTodos = todos.filter((todo) => todo._id !== id);
    //  http://localhost:5000/api/todos/6476fe3267e24b0b101343d3
    //  console.log(id);
    //  setTodos(updatedTodos);

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/todos/${id}`
      );
      if (response.status === 200) {
        // Delete successful, update todos state
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      } else {
        console.error("Delete operation failed");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

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
  }, [userId, currstate, updatestate]);

  const handleEdit = async (e) => {
    setisupdating(() => setisupdating(!isupdating));
    const id = e;
    setIdholder(id);
    // console.log(id);

    try {
      const res = await axios.get(`http://localhost:5000/api/todo/${id}`);
      // console.log(res.data.title);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setisupdating(() => setisupdating(!isupdating));
    } catch (err) {
      console.log("error :  " + err.message);
    }
  };
  const handleupdate = async (e) => {
    e.preventDefault();
    // console.log(idholder);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/todos/${idholder}`,
        {
          title: title,
          description: description,
        }
      );

      // console.log(response);
      setupdatestate(() => setupdatestate(!updatestate));
      setisupdating(() => setisupdating(!isupdating));
      setTitle("");
      setDescription("");
    } catch (err) {
      console.log(err);
    }
  };

  //   const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/api/todos`, {
        title,
        description,
        userId,
      });
      setcurrstate(true);

      console.log(response.data);

      // Clear form inputs
      setTitle("");
      setDescription("");

      // () => setCompleted(!completed)
      setcurrstate(() => setcurrstate(!currstate));

      // fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error.message);
      // Handle the error appropriately
    }
  };

  return (
    <div>
      <div className="todo-form">
        <h2>Add Todo</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {!isupdating ? (
            <button type="submit">Add Todo</button>
          ) : (
            <button type="button" onClick={(e) => handleupdate(e)}>
              Update Todo
            </button>
          )}
        </form>
      </div>

      {/* <ShowTodos /> */}
      <br></br>

      <div className="todo-card">
        <h2>Todos</h2>
        {todos.length === 0 ? (
          <p>No todos found.</p>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li className="list" key={todo._id}>
                <h3>{todo.title}</h3>
                <p>Completed: {todo.description}</p>
                <div onClick={() => handleEdit(todo._id)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </div>
                <div onClick={() => handleDelete(todo._id)}>
                  <i className="fa-sharp fa-solid fa-trash"></i>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoHome;
