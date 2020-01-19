import React, { Component } from "react";
import "./Entry.scss";

class Entry extends Component {
  render() {
    let { tags, title } = this.props;

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
            <a href={this.props.fullUrl} target="_blank">
              {truncatedTitle}
            </a>
          </div>
          <div className="article-edit">
            <span>Edit</span>
            <span>Delete</span>
          </div>
        </div>
        <div className="article-subinfo">{this.props.source}</div>
        <div className="article-snippet">{this.props.snippet}</div>
        <div className="article-date">{this.props.date}</div>
        <div className="article-tags">Tags{tagList}</div>
      </div>
    );
  }
}

export default Entry;
