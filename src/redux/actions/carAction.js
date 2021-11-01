import { toast } from 'react-toastify';
import * as types from './actionTypes';
import { getCar } from '../../api/carApi';

export const loadCarSuccess = car => ({ type: types.SET_CAR, car });

export function loadCar(id, token) {
  return async dispatch => {
    try {
      const data = await getCar(id, token);
      if (data) {
        dispatch(loadCarSuccess(data));
      } else {
        dispatch(loadCarSuccess(null));
      }
    } catch (error) {
      toast.error(`Whoops!, ${error.message} occured`);
    }
  };
}
