/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchAppointments, fetchAppointment, addMeasure, createAppointment,
} from '../services/request';
import { SET_READING, SET_READINGS, CREATE_READING } from '../actions/types';

const initialState = {
  cars: [],
  car: {},
};

export const getReading = createAsyncThunk(
  SET_READING,
  async (id) => {
    const response = await fetchAppointment(id);
    return response;
  },
);

export const getReadings = createAsyncThunk(
  SET_READINGS,
  async () => {
    const response = await fetchAppointments();
    return response;
  },
);

export const createMeasure = createAsyncThunk(
  CREATE_READING,
  async (formData) => {
    const response = await addMeasure(formData);
    return response;
  },
);

export const newAppointment = createAsyncThunk(
  CREATE_READING,
  async (data) => {
    const { formData, id } = data;
    const response = await createAppointment(formData, id);
    return response;
  },
);

export const carSlice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    setCars: (state, { payload }) => {
      state.cars = payload;
    },
    setCar: (state, { payload }) => {
      state.car = payload;
    },
  },

});

export const { setCar, setCars } = carSlice.actions;

export const selectCar = (state) => state.car.car;
export const selectCars = (state) => state.car.cars;

export default carSlice.reducer;
