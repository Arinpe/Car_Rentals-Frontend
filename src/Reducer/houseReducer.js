import * as types from '../actions/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case types.SET_HOUSE:
      return action.house;
    default:
      return state;
  }
};
