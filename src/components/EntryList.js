import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { filterEntries, getEntries } from "../actions/entryActions";

import Entry from "./Entry";

import Spinner from "./Spinner";

class EntryList extends Component {
  state = {
    filterTag: null
  };

  componentDidMount() {
    let { email } = this.props.auth.user;

    this.props.getEntries(email);
  }

  handleFilter = filterTag => {
    this.setState({ filterTag }, () => console.log(this.state.filterTag));
    let { email } = this.props.auth.user;

    if (!filterTag) {
      this.props.getEntries(email);
    } else {
      this.props.filterEntries(filterTag, email);
    }
  };

  render() {
    let { entryList, entriesLoading } = this.props.entries;

    if (entryList.length && !entriesLoading) {
      let entries = entryList.map((entry, i) => (
        <Entry entry={entry} handleFilter={this.handleFilter} key={i} />
      ));

      return (
        <>
          {this.state.filterTag && (
            <div className="selected-tag">
              Filtering articles by <span>#{this.state.filterTag}</span>
              {"  "}
              <span onClick={() => this.handleFilter(null)} className="lozenge">
                CLEAR TAG ✕
              </span>
            </div>
          )}
          {entries}
        </>
      );
    } else if (entriesLoading) {
      return <Spinner />;
    } else {
      return <div>No entries.</div>;
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  entries: state.entries
});

export default connect(mapStateToProps, { filterEntries, getEntries })(
  EntryList
);
