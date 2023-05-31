import React from "react";
import { Link } from "react-router-dom";

import "./Register.css";
const Home = () => {
  return (
    <div className="homepage">
      <button>
        <Link to="/login">Login</Link>
      </button>
      <button>
        <Link to="/register">Register</Link>
      </button>
    </div>
  );
};

export default Home;
