import React, { Component } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <>
        <div className="navbar">
          <div className="logo">
            <Link to="/">Memex.</Link>
          </div>
          <div className="right-information">
            <span className="user-info">Signed in as rishipr@umich.edu · </span>
            <span className="logout-info" onClick={() => alert("TODO")}>
              Logout
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default Navbar;
