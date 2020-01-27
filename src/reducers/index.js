import { combineReducers } from "redux";
import authReducer from "./authReducers";
import entryReducer from "./entryReducers";

export default combineReducers({
  auth: authReducer,
  entries: entryReducer
});
