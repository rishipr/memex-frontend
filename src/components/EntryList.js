import React, { Component } from "react";
import { connect } from "react-redux";

import { getEntries } from "../actions/entryActions";

import Entry from "./Entry";

let EntriesView = [
  // {
  //   title: "Google wants to be your bank: It will soon offer checking accounts",
  //   fullUrl: "www.google.com",
  //   source: "google.com",
  //   snippet:
  //     "Google (GOOGL) plans to offer checking accounts to customers starting next year, a source familiar with Google's plans told CNN Business.",
  //   date: new Date().toString(),
  //   tags: ["fintech", "google"],
  //   id: 1,
  //   notes: null
  // },
  // {
  //   title: "Second Title",
  //   fullUrl: "www.google.com",
  //   source: "google.com",
  //   snippet:
  //     "Google (GOOGL) plans to offer checking accounts to customers starting next year, a source familiar with Google's plans told CNN Business.",
  //   date: new Date().toString(),
  //   tags: ["fintech", "google"],
  //   id: 1,
  //   notes:
  //     "<p><b>Bold Shit</b></p><p><b><u>Underlined shit on a new line</u></b></p>"
  // }
];

export const addToList = entry => {
  let urlPath = entry.url.split(".com")[0].split("//")[1] + ".com";

  let newEntry = {
    title: entry.title,
    fullUrl: entry.url,
    source: urlPath,
    snippet: entry.description,
    date: new Date().toString(),
    tags: entry.tags,
    notes: entry.notes,
    id: entry.entry_id
  };

  EntriesView.push(newEntry);
};

export const filterList = term => {
  let newEntry = {
    title: "Second Title",
    fullUrl: "www.google.com",
    source: "google.com",
    snippet:
      "Google (GOOGL) plans to offer checking accounts to customers starting next year, a source familiar with Google's plans told CNN Business.",
    date: new Date().toString(),
    tags: ["fintech", "google"],

    id: 1,
    notes:
      "It's interesting to see Big Tech entering the financial technology space."
  };

  EntriesView.push(newEntry);
};

class EntryList extends Component {
  state = {
    entriesView: EntriesView
  };

  componentDidMount() {
    let { email } = this.props.auth.user;

    this.props.getEntries(email);
  }

  render() {
    let entryList = this.state.entriesView.map((entry, i) => (
      <Entry entry={entry} key={i} />
    ));

    return <>{entryList}</>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  entries: state.entries
});

export default connect(mapStateToProps, { getEntries })(EntryList);
