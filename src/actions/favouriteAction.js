import { toast } from 'react-toastify';
import * as types from './actionTypes';
import AllFavourites from '../api/favouriteApi';

export const loadFavouritesSuccess = favourites => ({
  type: types.SET_FAVOURITE,
  favourites,
});
export function loadFavourites(id, token) {
  return async dispatch => {
    try {
      const data = await AllFavourites(id, token);
      if (data) {
        dispatch(loadFavouritesSuccess(data));
      } else {
        dispatch(loadFavouritesSuccess(null));
      }
    } catch (error) {
      toast.error(`Whoops!, ${error.message} occured`);
    }
  };
}
