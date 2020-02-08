import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

import "./Auth.scss";

class Login extends Component {
  state = {
    username: "rishipr",
    password: "test123",
    errorMsg: null
  };

  // Push users to feed if they try to access this page while signed in
  componentDidMount() {
    if (this.props.auth.isLoggedIn) {
      this.props.history.push("/feed");
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.isLoggedIn !== prevProps.auth.isLoggedIn) {
      this.props.history.push("/feed");
    }
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleError = errorMsg => {
    this.setState({ errorMsg });
  };

  handleLogin = e => {
    e.preventDefault();
    this.setState({ errorMsg: null });

    let { username, password } = this.state;

    let email = null;

    // Lowercase everything
    username = username.toLowerCase();

    if (username.includes("@")) {
      email = username;
      username = null;
    }

    let payload = {
      username,
      email,
      password
    };

    this.props.loginUser(payload, this.props.history, this.handleError);
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-header">Welcome Back</div>
        <span className="auth-info">
          Don't have an account? <Link to="/register">Create Account</Link>
        </span>
        <form onSubmit={this.handleLogin}>
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
          {this.state.errorMsg ? (
            <div className="auth-error">{this.state.errorMsg}</div>
          ) : null}
          <button type="submit" className="modal-btn">
            Sign In
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
