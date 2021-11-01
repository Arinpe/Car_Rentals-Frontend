import * as types from '../actions/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return action.status;
    default:
      return state;
  }
};
