import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.appointment, action) => {
  switch (action.type) {
    case types.SET_APPOINTMENT:
      return action.appointment;
    default:
      return state;
  }
};
