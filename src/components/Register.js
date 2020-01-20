import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import "./Auth.scss";

class Register extends Component {
  state = {
    username: "",
    email: "",
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
    let { username, email, password } = this.state;

    let payload = {
      username,
      email,
      password
    };

    const REGISTER_BACKEND = "/register";

    axios
      .post(REGISTER_BACKEND, payload)
      .then(res => {
        this.setState({ loading: false, toDashboard: true });
        console.log("Success register");
        console.log(res.data);
      })
      .catch(err => {
        console.log("Error register " + err);
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
        <div className="auth-header">Create an Account</div>
        <span className="auth-info">
          Already have an account? <Link to="/login">Login</Link>
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
              <div>Email</div>
              <div>
                <input
                  className="auth-input"
                  onChange={this.handleChange}
                  value={this.state.email}
                  required
                  id="email"
                  name="email"
                  type="email"
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
            {this.state.loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
