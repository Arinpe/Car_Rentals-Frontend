import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import carReducer from './reducers/carSlice';
import appointmentReducer from './reducers/appointmentSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    car: carReducer,
    appointment: appointmentReducer,
  },
});
