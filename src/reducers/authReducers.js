import { SET_CURRENT_USER, SET_LOADING, SIGNOUT_USER } from "../actions/types";

const initialState = {
  isLoggedIn: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: {
          email: action.payload.email || null,
          username: action.payload.username || null
        }
      };
    case SIGNOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
        user: {}
      };
    case SET_LOADING:
      return {
        ...state,
        loading: !state.loading
      };
    default:
      return state;
  }
}
