import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.user, action) => {
  switch (action.type) {
    case types.SET_USER:
      return action.user;
    default:
      return state;
  }
};
