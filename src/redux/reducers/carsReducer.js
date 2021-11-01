import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.cars, action) => {
  switch (action.type) {
    case types.SET_CARS:
      return action.cars;
    default:
      return state;
  }
};
