import * as types from '../actions/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case types.SET_HOUSES:
      return action.houses;
    default:
      return state;
  }
};
