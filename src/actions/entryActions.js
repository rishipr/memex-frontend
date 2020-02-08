import axios from "axios";

import {
  ADD_ENTRY,
  DELETE_ENTRY,
  UPDATE_ENTRY,
  GET_ENTRIES,
  GET_USER_TAGS,
  SET_SELECTED_TAG,
  SET_ENTRIES_LOADING
} from "./types";

export const addEntry = (entry, closeModal) => dispatch => {
  axios
    .post("https://floating-cove-27585.herokuapp.com/entry/create", entry)
    .then(res => {
      dispatch({
        type: ADD_ENTRY,
        payload: res.data
      });

      closeModal();
    })
    .then(() => dispatch(getUserTags(entry.email)))
    .catch(err => console.log(err));
};

export const deleteEntry = (entry_id, email) => dispatch => {
  axios
    .post("https://floating-cove-27585.herokuapp.com/entry/delete", {
      entry_id,
      email
    })
    .then(() => {
      dispatch({
        type: DELETE_ENTRY,
        payload: entry_id
      });
    })
    .then(() => dispatch(getUserTags(email)))
    .catch(err => console.log(err));
};

export const updateEntry = (entry, closeModal) => dispatch => {
  axios
    .post("https://floating-cove-27585.herokuapp.com/entry/edit", entry)
    .then(res => {
      dispatch({
        type: UPDATE_ENTRY,
        payload: res.data
      });

      closeModal();
    })
    .then(() => dispatch(getUserTags(entry.email)))
    .catch(err => console.log(err));
};

export const searchEntries = (query, email) => dispatch => {
  dispatch(setEntriesLoading);
  axios
    .get("https://floating-cove-27585.herokuapp.com/search", {
      params: { query, email }
    })
    .then(res => {
      let payload = Object.keys(res.data).map(i => res.data[i]);

      dispatch({
        type: GET_ENTRIES,
        payload: payload
      });
    })
    .catch(err => console.log(err));
};

export const setFilteredTag = tag => dispatch => {
  let option = tag
    ? {
        value: tag,
        label: "#" + tag
      }
    : null;

  dispatch({
    type: SET_SELECTED_TAG,
    payload: option
  });
};

export const getUserTags = email => dispatch => {
  axios
    .get("https://floating-cove-27585.herokuapp.com/user-tags", {
      params: { email }
    })
    .then(res => {
      let { tags } = res.data;

      dispatch({
        type: GET_USER_TAGS,
        payload: tags
      });
    })
    .catch(err => console.log(err));
};

export const filterEntries = (tag, email) => dispatch => {
  dispatch(setEntriesLoading);

  axios
    .get("https://floating-cove-27585.herokuapp.com/filter", {
      params: { tag, email }
    })
    .then(res => {
      dispatch({
        type: GET_ENTRIES,
        payload: res.data.entries
      });
    })
    .catch(err => console.log(err));
};

export const getEntries = email => dispatch => {
  dispatch(setEntriesLoading);
  axios
    .get("https://floating-cove-27585.herokuapp.com/content", {
      params: {
        email
      }
    })
    .then(res => {
      let { entries } = res.data;

      dispatch({
        type: GET_ENTRIES,
        payload: entries
      });
    })
    .catch(err => console.log(err));
};

export const setEntriesLoading = dispatch => {
  dispatch({
    type: SET_ENTRIES_LOADING,
    payload: null
  });
};
