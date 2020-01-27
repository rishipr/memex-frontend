import React, { Component } from "react";
import "./AddLink.scss";
import axios from "axios";

import { addToList } from "./EntryList";

class AddLink extends Component {
  state = {
    articleURL: "https://www.cnn.com/2019/11/13/tech/google-checking-account/",
    articleTags: "",
    articleNotes: "",
    loading: false,
    error: false
  };

  addLink = e => {
    e.preventDefault();
    this.setState({ loading: true, error: false });

    let { articleURL, articleTags, articleNotes } = this.state;

    if (!(articleURL.includes("https://") || articleURL.includes("http://"))) {
      articleURL = "http://" + articleURL;
    }

    let tagsArr = null;
    if (articleTags) {
      tagsArr = articleTags.replace(" ", "").split(",");
    }

    let payload = {
      url: articleURL,
      tags: tagsArr,
      notes: articleNotes || null,
      uuid: 2
    };

    // http://10.0.0.192:5000
    // http://10.0.0.192:5000
    const BACKEND = `http://10.0.0.192:5000/entry/create`;

    axios
      .post(BACKEND, payload)
      .then(res => {
        addToList(res.data);

        this.setState({ loading: false });
        this.props.parentCallback();
      })
      .catch(err => {
        this.setState({ loading: false, error: true });
        console.log(err);
      });
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
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
              placeholder="Tags (comma-separated)"
              onChange={this.handleChange}
              value={this.state.articleTags}
              id="articleTags"
              name="articleTags"
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

export default AddLink;
