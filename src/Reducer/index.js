import { combineReducers } from 'redux';
import User from './userReducer';
import Houses from './housesReducer';
import House from './houseReducer';
import Loading from './loadingReducer';
import Favourites from './favouriteReducer';

export default combineReducers({
  User, Houses, House, Loading, Favourites,
});
