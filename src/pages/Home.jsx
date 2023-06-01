import React from "react";
import { Link } from "react-router-dom";

import "./Register.css";
const Home = () => {
  return (
    <div className="homepage">
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Home;
