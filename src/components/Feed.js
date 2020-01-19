import React, { Component } from "react";

import EntryList from "./EntryList";
import Search from "./Search";
import AddLink from "./AddLink";

class Feed extends Component {
  state = {
    addModal: false
  };

  triggerModal = () => {
    this.setState({ addModal: !this.state.addModal });
  };

  render() {
    return (
      <>
        <Search parentCallback={this.triggerModal} />
        <EntryList />
        {this.state.addModal && <AddLink parentCallback={this.triggerModal} />}
      </>
    );
  }
}

export default Feed;
