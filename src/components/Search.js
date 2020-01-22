import React, { Component } from "react";
import "./Search.scss";

import { filterList } from "./EntryList";

class Search extends Component {
  state = {
    searchTerm: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value }, () => {
      filterList(this.state.searchTerm);
    });
  };

  render() {
    return (
      <div className="feed-search">
        <input
          onChange={this.handleChange}
          value={this.state.searchTerm}
          id="searchTerm"
          name="searchTerm"
          type="text"
          className="input-field"
          placeholder="Search for articles, snippets, note or tags…"
        />
        <div onClick={this.props.parentCallback} className="link-btn">
          Add Link →
        </div>
      </div>
    );
  }
}

export default Search;
