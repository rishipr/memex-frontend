import axios from "axios";

import { GET_ENTRIES } from "./types";

export const getEntries = email => dispatch => {
  console.log("Fetching entires for " + email);

  axios
    .get("http://10.0.0.192:5000/content", {
      params: {
        uuid: 1
      }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
