import * as types from '../actions/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case types.SET_FAVOURITE:
      return action.favourites;
    default:
      return state;
  }
};
