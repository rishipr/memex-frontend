import axios from "axios";

import { SET_CURRENT_USER, SET_LOADING } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  dispatch(setLoading());

  axios
    .post("https://hidden-woodland-77642.herokuapp.com/register", userData)
    .then(res => {
      if (!res.data.error) {
        let userResult = {
          email: res.data.email,
          username: res.data.username
        };

        dispatch(setUser(userResult));

        history.push("/feed");
      } else {
        dispatch(setLoading());
      }
    })
    .catch(err => console.log(err));
};

export const loginUser = (userData, history) => dispatch => {
  dispatch(setLoading());

  axios
    .post("https://hidden-woodland-77642.herokuapp.com/login", userData)
    .then(res => {
      console.log(res);
      if (!res.data.error) {
        let userResult = {
          email: res.data.email,
          username: res.data.username
        };

        dispatch(setUser(userResult));

        history.push("/feed");
      } else {
        dispatch(setLoading());
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const setUser = user => dispatch => {
  let expiryDate = Date.now() + 31556926 / 1000;

  let string = expiryDate + "/" + (user.email || user.username);
  console.log(string);
  // localStorage.setItem("memex_token", string);

  dispatch({
    type: SET_CURRENT_USER,
    payload: user
  });
};

export const setLoading = () => dispatch => {
  dispatch({
    type: SET_LOADING,
    payload: null
  });
};
