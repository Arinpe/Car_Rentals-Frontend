import { toast } from 'react-toastify';
import * as types from './actionTypes';
import { getUser } from '../../api/userApi';

export const loadUserSuccess = user => ({ type: types.SET_USER, user });

export function loadUser(body, token) {
  return async dispatch => {
    try {
      const data = await getUser(body, token);
      if (data) { dispatch(loadUserSuccess(data)); }
    } catch (error) {
      toast.error(`Whoops!, ${error.message} occured`);
    }
  };
}
