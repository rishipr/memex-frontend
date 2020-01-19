import React, { Component } from "react";

import Entry from "./Entry";

let EntriesView = [];

export const addToList = entry => {
  let urlPath = entry.url.split(".com")[0].split("//")[1] + ".com";

  let newEntry = {
    title: entry.title,
    fullUrl: entry.url,
    source: urlPath,
    snippet: entry.description,
    date: new Date().toString(),
    tags: entry.tags,
    id: EntriesView.length
  };

  EntriesView.push(newEntry);
};

class EntryList extends Component {
  state = {
    entriesView: EntriesView
  };

  render() {
    let entryList = this.state.entriesView.map((entry, i) => (
      <Entry
        title={entry.title}
        fullUrl={entry.fullUrl}
        source={entry.source}
        snippet={entry.snippet}
        date={entry.date}
        tags={entry.tags}
        key={i}
        id={i}
      />
    ));

    return <>{entryList}</>;
  }
}

export default EntryList;
