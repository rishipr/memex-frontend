import { GET_ENTRIES } from "../actions/types";

const initialState = {
  isLoggedIn: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ENTRIES:
      return {
        ...state
      };
    default:
      return state;
  }
}
