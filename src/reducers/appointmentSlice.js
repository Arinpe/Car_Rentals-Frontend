/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAppointment, fetchAppointments } from '../services/request';
import { CREATE_APPOINTMENT, GET_APPOINTMENTS } from '../actions/types';

const initialState = {
  appointments: [],
};

export const getAppointments = createAsyncThunk(
  GET_APPOINTMENTS,
  async () => {
    const response = await fetchAppointments();
    return response;
  },
);

export const newAppointment = createAsyncThunk(
  CREATE_APPOINTMENT,
  async (data) => {
    const { formData } = data;
    const response = await createAppointment(formData);
    return response;
  },
);

export const carSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointments: (state, { payload }) => {
      state.appointments = payload;
    },
  },

});

export const { setAppointments } = carSlice.actions;

export const selectAppointments = (state) => state.appointments.appointments;

export default carSlice.reducer;
