import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { signOut, setUser } from "../actions/authActions";

// Component Imports
import Navbar from "./Navbar";
import Feed from "./Feed";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

import PrivateRoute from "./PrivateRoute";

class Container extends Component {
  // Keep user logged in
  componentDidMount() {
    if (typeof window !== "undefined" && localStorage.memex_token) {
      const currentTime = Date.now() / 1000;
      const traits = localStorage.getItem("memex_token").split("/");
      const expiry = parseInt(traits[0]);
      const email = traits[1];

      if (expiry < currentTime) {
        console.log("Access token expired... logging user out");
        this.props.signOut();
      } else if (!this.props.isLoggedIn) {
        let user = {
          email,
          expires_at: expiry.toString()
        };
        this.props.setUser(user);
      }
    }
  }

  render() {
    return (
      <div className="container">
        <Navbar />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Home} />
        <Switch>
          <PrivateRoute exact path="/feed" component={Feed} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { setUser, signOut })(Container);
