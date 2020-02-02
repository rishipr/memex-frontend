import axios from "axios";

import {
  ADD_ENTRY,
  DELETE_ENTRY,
  UPDATE_ENTRY,
  GET_ENTRIES,
  SET_ENTRIES_LOADING
} from "./types";

export const addEntry = (entry, closeModal) => dispatch => {
  axios
    .post("http://10.0.0.192:5000/entry/create", entry)
    .then(res => {
      dispatch({
        type: ADD_ENTRY,
        payload: res.data
      });

      closeModal();
    })
    .catch(err => console.log(err));
};

export const deleteEntry = (entry_id, email) => dispatch => {
  axios
    .post("http://10.0.0.192:5000/entry/delete", {
      entry_id,
      email
    })
    .then(res => {
      dispatch({
        type: DELETE_ENTRY,
        payload: entry_id
      });
    })
    .catch(err => console.log(err));
};

export const updateEntry = (entry, closeModal) => dispatch => {
  axios
    .post("http://10.0.0.192:5000/entry/edit", entry)
    .then(res => {
      dispatch({
        type: UPDATE_ENTRY,
        payload: res.data
      });

      closeModal();
    })
    .catch(err => console.log(err));
};

export const searchEntries = (query, email) => dispatch => {
  dispatch(setEntriesLoading);
  axios
    .get("http://10.0.0.192:5000/search", {
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

export const filterEntries = (tag, email) => dispatch => {
  dispatch(setEntriesLoading);

  axios
    .get("http://10.0.0.192:5000/filter", {
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
    .get("http://10.0.0.192:5000/content", {
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
