import React, { Component } from "react";
import "./Search.scss";

import { connect } from "react-redux";
import { searchEntries, getEntries } from "../actions/entryActions";

class Search extends Component {
  state = {
    query: ""
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value }, this.handleSearch);
  };

  handleSearch = () => {
    let { query } = this.state;
    const { email } = this.props.auth.user;

    if (query.length) {
      this.props.searchEntries(query, email);
    } else {
      this.props.getEntries(email);
    }
  };

  render() {
    return (
      <div className="feed-search">
        <input
          onChange={this.handleChange}
          value={this.state.query}
          id="query"
          name="query"
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { searchEntries, getEntries })(Search);
