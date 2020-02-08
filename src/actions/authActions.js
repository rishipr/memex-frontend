import axios from "axios";

import { SET_CURRENT_USER, SET_LOADING, SIGNOUT_USER } from "./types";

// Register User
export const registerUser = (userData, history, setError) => dispatch => {
  dispatch(setLoading());

  axios
    .post("http://10.0.0.192:5000/register", userData)
    .then(res => {
      let userResult = {
        email: res.data.email,
        username: res.data.username
      };

      dispatch(setUser(userResult));

      history.push("/feed");
    })
    .catch(err => {
      let error = err.response.data.error;
      setError(error);
    });
};

export const loginUser = (userData, history, setError) => dispatch => {
  axios
    .post("http://10.0.0.192:5000/login", userData)
    .then(res => {
      let userResult = {
        email: res.data.email,
        username: res.data.username
      };

      dispatch(setUser(userResult));

      history.push("/feed");
    })
    .catch(err => {
      let error = err.response.data.error;
      setError(error);
    });
};

export const setUser = user => dispatch => {
  let expiryDate = Date.now() + 31556926 / 1000;

  let string = expiryDate + "/" + (user.email || user.username);
  localStorage.setItem("memex_token", string);

  dispatch({
    type: SET_CURRENT_USER,
    payload: user
  });
};

export const signOut = () => dispatch => {
  localStorage.removeItem("memex_token");
  window.location.href = "./";

  dispatch({
    type: SIGNOUT_USER,
    payload: null
  });
};

export const setLoading = () => dispatch => {
  dispatch({
    type: SET_LOADING,
    payload: null
  });
};
