import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import "./Auth.scss";

class Login extends Component {
  state = {
    username: "",
    password: "",
    loading: false,
    toDashboard: false
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleRegister = e => {
    e.preventDefault();
    this.setState({ loading: true });
    let { username, password } = this.state;

    let payload = {
      username,
      password
    };

    const LOGIN_BACKEND = "/login";

    axios
      .post(LOGIN_BACKEND, payload)
      .then(res => {
        this.setState({ loading: false, toDashboard: true });
        console.log("Success login");
        console.log(res.data);
      })
      .catch(err => {
        console.log("Error login " + err);
        this.setState({ loading: false });
      });
  };

  render() {
    if (this.state.toDashboard) {
      let { username } = this.state;
      return <Redirect to={`/?user=${username}`} />;
    }

    return (
      <div className="auth-container">
        <div className="auth-header">Welcome Back</div>
        <span className="auth-info">
          Don't have an account? <Link to="/register">Create Account</Link>
        </span>
        <form onSubmit={this.handleRegister}>
          <div className="form-group">
            <label>
              <div>Username</div>
              <div>
                <input
                  className="auth-input"
                  onChange={this.handleChange}
                  value={this.state.username}
                  required
                  id="username"
                  name="username"
                  type="username"
                />
              </div>
            </label>
          </div>
          <div className="form-group">
            <label>
              <div>Password</div>
              <div>
                <input
                  className="auth-input"
                  onChange={this.handleChange}
                  value={this.state.password}
                  required
                  id="password"
                  name="password"
                  type="password"
                />
              </div>
            </label>
          </div>
          {this.state.error ? (
            <div className="content error">{this.state.error}</div>
          ) : null}
          <button type="submit" className="modal-btn">
            {this.state.loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
