import * as types from '../actions/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case types.SET_USER:
      return action.user;
    default:
      return state;
  }
};
