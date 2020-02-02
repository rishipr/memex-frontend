import React, { Component } from "react";
import { connect } from "react-redux";

import EntryList from "./EntryList";
import Search from "./Search";
import AddLink from "./AddLink";
import Filter from "./Filter";

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
        {this.props.entries.length > 0 && <Filter />}
        <EntryList />
        {this.state.addModal && <AddLink parentCallback={this.triggerModal} />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  entries: state.entries.entryList
});

export default connect(mapStateToProps, {})(Feed);
