import React, { Component } from "react";
import "./EditEntry.scss";
import Editor from "react-medium-editor";

import { connect } from "react-redux";
import { updateEntry } from "../actions/entryActions";

require("medium-editor/dist/css/medium-editor.css");
require("medium-editor/dist/css/themes/default.css");

class EditEntry extends Component {
  state = {
    entryTitle: "" || this.props.entry.title,
    entrySnippet: "" || this.props.entry.snippet,
    entryTags: "" || this.props.entry.tags,
    entryNotes: "" || this.props.entry.notes
  };

  componentDidMount() {
    document
      .getElementById("entryNotes")
      .setAttribute("data-placeholder", "Start typing your thoughts...");

    // Convert initial array of tags into string
    if (Array.isArray(this.props.entry.tags)) {
      let tagsStr = this.props.entry.tags.join();
      this.setState({ entryTags: tagsStr });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleMedium = (text, medium) => {
    this.setState({ entryNotes: text });
  };

  handleSave = e => {
    e.preventDefault();

    let { entryTitle, entrySnippet, entryTags, entryNotes } = this.state;
    let { _id } = this.props.entry;
    let { email } = this.props.auth.user;

    let tagsArr = null;
    if (entryTags) {
      tagsArr = entryTags.replace(" ", "").split(",");
    }

    let payload = {
      email,
      title: entryTitle,
      snippet: entrySnippet,
      tags: tagsArr,
      notes: entryNotes,
      url: this.props.entry.url,
      entry_id: _id
    };

    this.props.updateEntry(payload, this.props.triggerModal);
  };

  render() {
    let { entry } = this.props;

    return (
      <div className="modal-bg">
        <div className="modal modal-edit">
          <form onSubmit={this.handleSave}>
            <div className="modal-top">
              <div className="modal-header modal-source">{entry.source}</div>
              <div className="modal-close" onClick={this.props.triggerModal}>
                Close
              </div>
            </div>
            <div>
              <span className="modal-label">Article Title</span>
              <input
                type="text"
                className="modal-title"
                placeholder="Title of Article"
                onChange={this.handleChange}
                value={this.state.entryTitle}
                id="entryTitle"
                name="entryTitle"
                required
              />
              <span className="modal-label">Article Snippet</span>
              <input
                type="text"
                className="modal-title modal-snippet"
                placeholder="Short summary of article"
                onChange={this.handleChange}
                value={this.state.entrySnippet}
                id="entrySnippet"
                name="entrySnippet"
              />
              <span className="modal-label">Tags</span>
              <input
                type="text"
                className="modal-input"
                placeholder="Tags (comma-separated)"
                onChange={this.handleChange}
                value={this.state.entryTags || ""}
                id="entryTags"
                name="entryTags"
              />
              <div className="modal-edit-btns">
                <button type="submit" className="modal-btn">
                  {this.state.loading ? "Updating..." : "Update Entry"}
                </button>
              </div>
            </div>
            <div className="modal-medium">
              <span className="modal-label">Personal Notes</span>
              <Editor
                text={this.state.entryNotes}
                placeholder="Start"
                id="entryNotes"
                name="entryNotes"
                onChange={this.handleMedium}
                options={{
                  toolbar: { buttons: ["bold", "italic", "underline"] }
                }}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { updateEntry })(EditEntry);
