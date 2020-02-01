import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";

import "./Auth.scss";

class Register extends Component {
  state = {
    username: "rishipr",
    email: "rishipr@umich.edu",
    password: "test123"
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

  handleRegister = e => {
    e.preventDefault();

    let { username, email, password } = this.state;

    let payload = {
      username,
      email,
      password
    };

    this.props.registerUser(payload, this.props.history);
  };

  render() {
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
                  type="text"
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
            Register
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
