import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";

// Component Imports
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

import PrivateRoute from "./components/PrivateRoute";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
            <Navbar />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Home} />
            <Switch>
              <PrivateRoute exact path="/feed" component={Feed} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
