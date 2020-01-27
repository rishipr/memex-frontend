import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";

import Container from "./components/Container";

// Redux
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Container />
        </Router>
      </Provider>
    );
  }
}

export default App;
