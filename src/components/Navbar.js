import React, { Component } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { signOut } from "../actions/authActions";

// Temp
import axios from "axios";

class Navbar extends Component {
  nukeDB = () => {
    if (
      window.confirm(
        "Are you sure you want to deploy a tactical nuke on our DB, mongy?"
      )
    ) {
      axios.get("http://10.0.0.192:5000/nuke-db").then(res => {
        console.log("Tactical nuke deployed on db");
        alert("Tactical nuke deployed.");

        if (typeof window !== "undefined") {
          this.props.signOut();
        }
      });
    }
  };

  render() {
    let { isLoggedIn } = this.props.auth;
    let { email, username } = this.props.auth.user;

    return (
      <>
        <div className="navbar">
          <div className="logo">
            <Link to="/">Memex.</Link>
            <span onClick={this.nukeDB} className="nuketown">
              Nuketown
            </span>
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
