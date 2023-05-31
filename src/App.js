import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import TodoHome from "./pages/TodoHome";
import ShowTodos from "./components/ShowTodos";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/todohome" component={TodoHome} />
        {/* <Route path="/showtodos" component={ShowTodos} /> */}
      </Switch>
    </div>
  );
};

export default App;
