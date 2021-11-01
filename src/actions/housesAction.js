import { toast } from 'react-toastify';
import * as types from './actionTypes';
import { getHouses } from '../api/houseApi';

export const loadHousesSuccess = houses => ({ type: types.SET_HOUSES, houses });
export function loadHouses(token) {
  return async dispatch => {
    try {
      const data = await getHouses(token);
      if (data) {
        dispatch(loadHousesSuccess(data));
      } else {
        dispatch(loadHousesSuccess(null));
      }
    } catch (error) {
      toast.error(`Whoops!, ${error.message} occured`);
    }
  };
}
