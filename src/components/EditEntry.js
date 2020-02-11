import React, { Component } from "react";
import "./EditEntry.scss";
import Editor from "react-medium-editor";
import CreatableSelect from "react-select/creatable";

import { connect } from "react-redux";
import { updateEntry } from "../actions/entryActions";

require("medium-editor/dist/css/medium-editor.css");
require("medium-editor/dist/css/themes/default.css");

class EditEntry extends Component {
  state = {
    entryTitle: "" || this.props.entry.title,
    entrySnippet: "" || this.props.entry.snippet,
    entryNotes: "" || this.props.entry.notes,
    entryTags: this.props.entry.tags,
    tagsFocused: false,
    defaultSelected: null
  };

  componentDidMount() {
    document
      .getElementById("entryNotes")
      .setAttribute("data-placeholder", "Start typing your thoughts...");

    console.log(this.props.entry.tags);
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleMedium = (text, medium) => {
    this.setState({ entryNotes: text });
  };

  handleSave = e => {
    e.preventDefault();

    if (this.state.tagsFocused) {
      return;
    }

    let { entryTitle, entrySnippet, entryNotes, entryTags } = this.state;
    let { _id } = this.props.entry;
    let { email } = this.props.auth.user;

    let payload = {
      email,
      title: entryTitle,
      snippet: entrySnippet,
      tags: entryTags,
      notes: entryNotes,
      url: this.props.entry.url,
      entry_id: _id
    };

    this.props.updateEntry(payload, this.props.triggerModal);
  };

  handleTagsChange = values => {
    let valueArr = [];

    if (values) {
      values.forEach(value => valueArr.push(value.value));
      this.setState({ entryTags: valueArr });
    } else {
      this.setState({ entryTags: null });
    }
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
              <div className="modal-select-tags">
                <CreatableSelect
                  className="modal-tags-select"
                  placeholder="Create or select tags"
                  onFocus={() => this.setState({ tagsFocused: true })}
                  onBlur={() => this.setState({ tagsFocused: false })}
                  isMulti
                  isClearable
                  isSearchable
                  onChange={this.handleTagsChange}
                  defaultValue={
                    this.props.entry.tags
                      ? this.props.entries.userTags.filter(tag =>
                          this.props.entry.tags.includes(tag.value)
                        )
                      : null
                  }
                  options={this.props.entries.userTags}
                  noOptionsMessage={() => "Start typing to create a new tag"}
                />
              </div>
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
  auth: state.auth,
  entries: state.entries
});

export default connect(mapStateToProps, { updateEntry })(EditEntry);
