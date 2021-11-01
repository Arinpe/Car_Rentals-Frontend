import { toast } from 'react-toastify';
import * as types from './actionTypes';
import AllAppointment from '../../api/appointmentApi';

export const loadAppointmentsSuccess = appointment => (
  { type: types.SET_APPOINTMENT, appointment }
);

export function loadAppointments(id, token) {
  return async dispatch => {
    try {
      const data = await AllAppointment(id, token);
      if (data) {
        dispatch(loadAppointmentsSuccess(data));
      } else {
        dispatch(loadAppointmentsSuccess(null));
      }
    } catch (error) {
      toast.error(`Whoops!, ${error.message} occured`);
    }
  };
}
