import axios from "axios";

import { SET_CURRENT_USER, SET_LOADING, SIGNOUT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  dispatch(setLoading());

  axios
    .post("https://floating-cove-27585.herokuapp.com/register", userData)
    .then(res => {
      let userResult = {
        email: res.data.email,
        username: res.data.username
      };

      dispatch(setUser(userResult));

      history.push("/feed");
    })
    .catch(err => console.log(err));
};

export const loginUser = (userData, history) => dispatch => {
  dispatch(setLoading());

  axios
    .post("https://floating-cove-27585.herokuapp.com/login", userData)
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
    .catch(err => {
      console.log(err);
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
