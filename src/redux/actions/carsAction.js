import { toast } from 'react-toastify';
import * as types from './actionTypes';
import { getCars } from '../../api/carApi';

export const loadCarsSuccess = cars => ({ type: types.SET_CARS, cars });

export function loadCars(token) {
  return async dispatch => {
    try {
      const data = await getCars(token);
      if (data) {
        dispatch(loadCarsSuccess(data));
      } else {
        dispatch(loadCarsSuccess(null));
      }
    } catch (error) {
      toast.error(`Whoops!, ${error.message} occured`);
    }
  };
}
