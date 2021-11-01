import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.car, action) => {
  switch (action.type) {
    case types.SET_CAR:
      return action.car;
    default:
      return state;
  }
};
