import React, { Component } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { signOut } from "../actions/authActions";

class Navbar extends Component {
  render() {
    let { isLoggedIn } = this.props.auth;
    let { email, username } = this.props.auth.user;

    return (
      <>
        <div className="navbar">
          <div className="logo">
            <Link to="/">Memex.</Link>
          </div>
          {isLoggedIn ? (
            <div className="right-information">
              <span className="user-info">
                Signed in as {email || username} ·{" "}
              </span>
              <span
                className="logout-info"
                onClick={() => this.props.signOut()}
              >
                Logout
              </span>
            </div>
          ) : (
            <div className="right-information">
              <span className="link-btn">
                <Link to="/login">Sign In</Link> ·{" "}
              </span>
              <span className="link-btn">
                <Link to="/register">Create Account</Link>
              </span>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { signOut })(Navbar);
