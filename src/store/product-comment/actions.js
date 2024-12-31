export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';

export const loadComments = (comments) => {
  return {
    type: LOAD_COMMENTS,
    payload: comments
  };
};

export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    payload: comment
  };
};
