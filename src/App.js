import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Component Imports
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Feed} />
      </div>
    </Router>
  );
}

export default App;
