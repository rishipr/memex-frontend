import React, { Component } from "react";
import "./Entry.scss";

import EditEntry from "./EditEntry";

class Entry extends Component {
  state = {
    editModal: false
  };

  triggerModal = () => {
    this.setState({ editModal: !this.state.editModal });
  };

  render() {
    let { entry } = this.props;
    let { tags, title } = entry;

    let tagList;

    if (tags) {
      tagList = tags.map((tag, i) => (
        <span key={i} className="tag-info">
          #{tag.toLowerCase()}
        </span>
      ));
    }

    let truncatedTitle = title.slice(0, 50) + "...";

    return (
      <div className="entry-box">
        <div className="entry-top">
          <div className="article-title">
            <a href={entry.fullUrl} target="_blank" rel="noopener noreferrer">
              {truncatedTitle}
            </a>
          </div>
          <div className="article-edit">
            <span onClick={this.triggerModal}>Edit</span>
            <span>Delete</span>
          </div>
        </div>
        <div className="article-subinfo">{entry.source}</div>
        <div className="article-snippet">{entry.snippet}</div>
        <div className="article-date">{entry.date}</div>
        <div className="article-tags">Tags{tagList}</div>
        {this.state.editModal && (
          <EditEntry entry={entry} triggerModal={this.triggerModal} />
        )}
      </div>
    );
  }
}

export default Entry;
