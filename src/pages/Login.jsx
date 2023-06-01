import React, { useState } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import "./Login.css";
const Login = ({ history }) => {
  //   const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setmsg] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      // console.log(response.data.message);
      const loginuserid = response.data.user._id;

      setmsg(response.data.message);

      sessionStorage.setItem("userId", loginuserid);

      history.replace(`/todohome`);

      // console.log("User Login");
      // You can perform any additional actions after successful registration

      // Clear form inputsa
      setEmail("");
      setPassword("");
      setmsg("");
    } catch (error) {
      console.error("Error registering user:", error.message);
      // Handle the error appropriately
    }
  };

  return (
    <div className="login-card">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
          <Link className="btn" to="/register">
            Register
          </Link>
        </div>
      </form>

      <h3>{msg ? msg : ""}</h3>
    </div>
  );
};

export default Login;
