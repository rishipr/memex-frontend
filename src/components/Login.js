import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import axios from "axios";

import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

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

    let email = null;

    if (username.includes("@")) {
      email = username;
      username = null;
    }

    let payload = {
      username,
      email,
      password
    };

    this.props.loginUser(payload, this.props.history);
  };

  render() {
    if (this.state.toDashboard) {
      let { username } = this.state;
      return <Redirect to={`/?user=${username}`} />;
    }

    let { loading } = this.props.auth;

    return (
      <div className="auth-container">
        <div className="auth-header">Welcome Back</div>
        <span className="auth-info">
          Don't have an account? <Link to="/register">Create Account</Link>
        </span>
        <form onSubmit={this.handleRegister}>
          <div className="form-group">
            <label>
              <div>Username or Email</div>
              <div>
                <input
                  className="auth-input"
                  onChange={this.handleChange}
                  value={this.state.username}
                  required
                  id="username"
                  name="username"
                  type="text"
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
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
