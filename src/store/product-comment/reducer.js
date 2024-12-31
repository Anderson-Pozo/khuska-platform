import { ADD_COMMENT, LOAD_COMMENTS } from './actions';

const initialState = {
  comments: []
};

export const productCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        comments: [...action.payload]
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments]
      };
    default:
      return state;
  }
};
