import {
  ADD_ENTRY,
  DELETE_ENTRY,
  UPDATE_ENTRY,
  GET_ENTRIES,
  SET_ENTRIES_LOADING
} from "../actions/types";

const initialState = {
  entryList: [],
  entriesLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ENTRY:
      let newList = state.entryList;
      newList.push(action.payload);
      return {
        ...state,
        entryList: [...newList]
      };
    case DELETE_ENTRY:
      let postDelete = state.entryList;
      postDelete = postDelete.filter(entry => entry._id !== action.payload);

      return {
        ...state,
        entryList: [...postDelete]
      };
    case UPDATE_ENTRY:
      let idToUpdate = action.payload._id;
      let updatedList = state.entryList;
      let index = updatedList.findIndex(entry => entry._id === idToUpdate);
      updatedList[index] = action.payload;

      return {
        ...state,
        entryList: [...updatedList]
      };
    case GET_ENTRIES:
      state.entryList = [];
      action.payload.map(entry => state.entryList.push(entry));

      return {
        ...state,
        entryList: [...state.entryList],
        entriesLoading: false
      };
    case SET_ENTRIES_LOADING:
      return {
        ...state,
        entriesLoading: true
      };
    default:
      return state;
  }
}
