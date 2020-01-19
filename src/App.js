import React from "react";
import "./App.scss";

// Component Imports
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";

function App() {
  return (
    <div className="container">
      <Navbar />
      <Feed />
    </div>
  );
}

export default App;
