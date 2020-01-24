import React, { Component } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";

import brush from "../img/brush.png";
import memory from "../img/memory-brush.png";

import Typed from "react-typed";

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="home-header">Memex.</div>
        <div className="home-snippet">
          Rethinking how we manage long-term memory
        </div>
        <Typed
          strings={[
            "Save your articles...",
            "Save your snippets...",
            "Save your tweets...",
            "Save your spotify links...",
            "Save your personal thoughts..."
          ]}
          typeSpeed={50}
          backSpeed={50}
          backDelay={1000}
          loop
          smartBackspace
        />
        <img className="home-paint" src={brush} alt="brushstrokes" />
        <img className="home-bg" src={memory} alt="brushstrokes" />
        <Link to="/login">Sign In</Link>
        <Link to="/register">Create Account</Link>
      </div>
    );
  }
}

export default Home;
