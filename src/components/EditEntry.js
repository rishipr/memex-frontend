import React, { Component } from "react";
import "./EditEntry.scss";
import Editor from "react-medium-editor";
import axios from "axios";

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
    let { id } = this.props.entry;

    let tagsArr = null;
    if (entryTags) {
      tagsArr = entryTags.replace(" ", "").split(",");
    }

    let payload = {
      title: entryTitle,
      snippet: entrySnippet,
      tags: tagsArr,
      notes: entryNotes,
      uuid: 2,
      url: "pornhub.com/machine_learning",
      entry_id: id
    };

    const BACKEND = `http://10.0.0.192:5000/entry/edit`;

    axios
      .post(BACKEND, payload)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
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

export default EditEntry;
