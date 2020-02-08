import {
  ADD_ENTRY,
  DELETE_ENTRY,
  UPDATE_ENTRY,
  GET_ENTRIES,
  SET_ENTRIES_LOADING,
  GET_USER_TAGS,
  SET_SELECTED_TAG
} from "../actions/types";

const initialState = {
  entryList: [],
  entriesLoading: false,
  userTags: [],
  selectedTag: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ENTRY:
      let newList = state.entryList;
      newList.unshift(action.payload);
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
    case GET_USER_TAGS:
      state.userTags = [];
      let tagsArr = [];

      if (action.payload.length > 0) {
        action.payload.forEach(tag => {
          let option = {
            value: tag,
            label: "#" + tag
          };

          tagsArr.push(option);
        });
      }

      return {
        ...state,
        userTags: tagsArr
      };
    case SET_SELECTED_TAG:
      return {
        ...state,
        selectedTag: action.payload
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
