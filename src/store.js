import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import measurementReducer from './reducers/readingSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    measurement: measurementReducer,
  },
});
