import React, { Component } from "react";
import "./Search.scss";

class Search extends Component {
  render() {
    return (
      <div className="feed-search">
        <input
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
