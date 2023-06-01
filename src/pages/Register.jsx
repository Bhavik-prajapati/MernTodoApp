import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setmsg] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/users", {
        name,
        email,
        password,
      });
      setmsg(response.data.message);
      // console.log();

      console.log("User registered successfully");
      // You can perform any additional actions after successful registration

      // Clear form inputs
      setName("");
      setEmail("");
      setPassword("");
      setmsg("");
      history.replace("/login");
    } catch (error) {
      console.error("Error registering user:", error.message);
      // Handle the error appropriately
    }
  };

  return (
    <div className="register-form">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Register</button>
          <Link className="btn" to="/login">
            Login
          </Link>
        </div>
      </form>

      <h3>{msg ? msg : ""}</h3>
    </div>
  );
};

export default Register;
