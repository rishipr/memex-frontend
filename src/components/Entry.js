import React, { Component } from "react";
import "./Entry.scss";

import { connect } from "react-redux";
import { setFilteredTag, deleteEntry } from "../actions/entryActions";

import EditEntry from "./EditEntry";

class Entry extends Component {
  state = {
    editModal: false
  };

  componentDidMount() {
    console.log(this.props.entry);
  }

  triggerModal = () => {
    this.setState({ editModal: !this.state.editModal });
  };

  handleDelete = () => {
    let entry_id = this.props.entry._id;
    let { email } = this.props.auth.user;
    this.props.deleteEntry(entry_id, email);
  };

  handleTagSelect = tag => {
    this.props.setFilteredTag(tag);
  };

  render() {
    let { entry } = this.props;
    let { tags, title } = entry;

    let source = entry.url.split(".com")[0].split("//")[1] + ".com";

    let tagList;
    if (tags) {
      tagList = tags.map((tag, i) => (
        <span
          onClick={() => this.props.setFilteredTag(tag)}
          key={i}
          className="tag-info"
        >
          #{tag.toLowerCase()}
        </span>
      ));
    }

    let truncatedTitle = title.length > 50 ? title.slice(0, 50) + "..." : title;

    return (
      <>
        <div className="entry-box">
          <div className="entry-top">
            <div className="article-title">
              <a href={entry.url} target="_blank" rel="noopener noreferrer">
                {truncatedTitle}
              </a>
            </div>
            <div className="article-edit">
              <span onClick={this.triggerModal} className="material-icons">
                edit
              </span>
              <span onClick={this.handleDelete} className="material-icons">
                delete
              </span>
            </div>
          </div>
          <div className="article-subinfo">{source}</div>
          <div className="article-snippet">{entry.snippet}</div>
          <div className="article-date">{entry["add-date"]}</div>
          <div className="article-tags">
            Tags
            {tags && tags.length > 0 ? (
              tagList
            ) : (
              <span className="tag-info-none"> none</span>
            )}
          </div>
        </div>
        {this.state.editModal && (
          <EditEntry entry={entry} triggerModal={this.triggerModal} />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { setFilteredTag, deleteEntry })(Entry);
