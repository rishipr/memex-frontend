import React, { Component } from "react";
import { connect } from "react-redux";

import { filterEntries, getEntries } from "../actions/entryActions";

import Entry from "./Entry";
import Spinner from "./Spinner";
import NoEntries from "./NoEntries";

const MEMEXES = [
  {
    memex: "m1",
    entries: [
      {
        id: null,
        addDate: null,
        email: null,
        keywords: null,
        notes: null,
        snippet: null,
        tags: null,
        title: null,
        url: null
      }
    ]
  },
  {
    memex: "m2",
    entries: [
      {
        id: null,
        addDate: null,
        email: null,
        keywords: null,
        notes: null,
        snippet: null,
        tags: null,
        title: null,
        url: null
      }
    ]
  }
];

class EntryList extends Component {
  componentDidMount() {
    let { email } = this.props.auth.user;

    this.props.getEntries(email);
  }

  render() {
    let { entryList, entriesLoading } = this.props.entries;

    if (entryList.length && !entriesLoading) {
      let entries = entryList.map((entry, i) => (
        <Entry entry={entry} key={i} />
      ));

      return <>{entries}</>;
    } else if (entriesLoading) {
      return <Spinner />;
    } else {
      return <NoEntries />;
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
