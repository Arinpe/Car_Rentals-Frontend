/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchMeasurement, fetchMeasurements, addMeasure, addMeasurement,
} from '../services/request';
import { SET_READING, SET_READINGS, CREATE_READING } from '../actions/types';

const initialState = {
  measurement: {},
  measurements: [],
};

export const getReading = createAsyncThunk(
  SET_READING,
  async (id) => {
    const response = await fetchMeasurement(id);
    return response;
  },
);

export const getReadings = createAsyncThunk(
  SET_READINGS,
  async () => {
    const response = await fetchMeasurements();
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

export const createMeasurement = createAsyncThunk(
  CREATE_READING,
  async (data) => {
    const { formData, id } = data;
    const response = await addMeasurement(formData, id);
    return response;
  },
);

export const measurementSlice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    setReadings: (state, { payload }) => {
      state.measurements = payload;
    },
    setReading: (state, { payload }) => {
      state.measurement = payload;
    },
  },

});

export const { setReading, setReadings } = measurementSlice.actions;

export const selectReading = (state) => state.measurement.measurement;
export const selectReadings = (state) => state.measurement.measurements;

export default measurementSlice.reducer;
