import React, { Component } from "react";
import "./Filter.scss";

import { connect } from "react-redux";

import {
  setFilteredTag,
  filterEntries,
  getEntries
} from "../actions/entryActions";

import axios from "axios";
import Select from "react-select";

class Filter extends Component {
  state = {
    selectedOption: null,
    options: []
  };

  componentDidMount() {
    let { email } = this.props.auth.user;

    axios
      .get("http://10.0.0.192:5000/user-tags", {
        params: { email }
      })
      .then(res => {
        let { tags } = res.data;

        if (tags.length > 0) {
          tags.forEach(tag => {
            let option = {
              value: tag,
              label: "#" + tag
            };

            let { options } = this.state;
            let newArr = options;
            newArr.push(option);

            this.setState({ options: newArr });
          });
        }
      })
      .catch(err => console.log(err));
  }

  handleChange = selectedOption => {
    let { email } = this.props.auth.user;

    if (!selectedOption) {
      this.props.setFilteredTag(null);
      this.props.getEntries(email);
    } else {
      let option = selectedOption.value;
      this.props.setFilteredTag(option);
      this.props.filterEntries(option, email);
    }
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.entries.selectedTag !== this.props.entries.selectedTag &&
      this.props.entries.selectedTag !== null
    ) {
      let currTag = this.props.entries.selectedTag.value;
      let { email } = this.props.auth.user;

      this.props.filterEntries(currTag, email);
    }
  }

  render() {
    return (
      <div className="filter-select">
        <Select
          placeholder="Filter by tag"
          isClearable
          isSearchable
          options={this.state.options}
          value={this.props.entries.selectedTag}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  entries: state.entries
});

export default connect(mapStateToProps, {
  setFilteredTag,
  filterEntries,
  getEntries
})(Filter);
