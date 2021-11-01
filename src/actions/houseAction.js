import { toast } from 'react-toastify';
import * as types from './actionTypes';
import { getHouse } from '../api/houseApi';

export const loadHouseSuccess = house => ({
  type: types.SET_HOUSE,
  house,
});
export function loadHouse(id, token) {
  return async dispatch => {
    try {
      const data = await getHouse(id, token);
      if (data) {
        dispatch(loadHouseSuccess(data));
      } else {
        dispatch(loadHouseSuccess(null));
      }
    } catch (error) {
      toast.error(`Whoops!, ${error.message} occured`);
    }
  };
}
