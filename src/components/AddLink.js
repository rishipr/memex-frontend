import React, { Component } from "react";
import "./AddLink.scss";
import { connect } from "react-redux";
import { addEntry, setFilteredTag } from "../actions/entryActions";
import CreatableSelect from "react-select/creatable";

class AddLink extends Component {
  state = {
    articleURL: "https://www.cnn.com/2019/11/13/tech/google-checking-account/",
    articleTags: null,
    articleNotes: "",
    userTags: [],
    tagsFocused: false,
    loading: false,
    error: false
  };

  addLink = e => {
    e.preventDefault();

    if (this.state.tagsFocused) {
      return;
    }

    this.setState({ loading: true, error: false });

    let { email } = this.props.auth.user;

    let { articleURL, articleTags, articleNotes } = this.state;

    // Lowercase everything
    email = email.toLowerCase();

    if (!(articleURL.includes("https://") || articleURL.includes("http://"))) {
      articleURL = "http://" + articleURL;
    }

    let payload = {
      url: articleURL,
      tags: articleTags,
      notes: articleNotes || null,
      email
    };

    this.props.addEntry(payload, this.props.parentCallback);
    this.props.setFilteredTag(null);
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleTagsChange = values => {
    let valueArr = [];

    if (values) {
      values.forEach(value => valueArr.push(value.value));
      this.setState({ articleTags: valueArr });
    } else {
      this.setState({ articleTags: null });
    }
  };

  render() {
    return (
      <div className="modal-bg">
        <div className="modal">
          <div className="modal-top">
            <div className="modal-header">Add Link</div>
            <div className="modal-close" onClick={this.props.parentCallback}>
              Close
            </div>
          </div>
          <form onSubmit={this.addLink}>
            <input
              type="text"
              className="modal-input"
              placeholder="Full URL of article *"
              onChange={this.handleChange}
              value={this.state.articleURL}
              id="articleURL"
              name="articleURL"
              required
              autoFocus
            />
            <input
              type="text"
              className="modal-input"
              placeholder="Personal Notes"
              onChange={this.handleChange}
              value={this.state.articleNotes}
              id="articleNotes"
              name="articleNotes"
            />
            <CreatableSelect
              className="modal-tags-select"
              placeholder="Create or select tags"
              onFocus={() => this.setState({ tagsFocused: true })}
              onBlur={() => this.setState({ tagsFocused: false })}
              isMulti
              isClearable
              isSearchable
              onChange={this.handleTagsChange}
              options={this.props.entries.userTags}
              noOptionsMessage={() => "Start typing to create a new tag"}
            />
            <button type="submit" className="modal-btn">
              {this.state.loading ? "Adding..." : "Add Link"}
            </button>
            {this.state.error && (
              <div className="error-msg">
                Error adding article. Please check the validity of the inputted
                URL.
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  entries: state.entries
});

export default connect(mapStateToProps, { addEntry, setFilteredTag })(AddLink);
