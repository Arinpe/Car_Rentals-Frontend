/* eslint-disable no-param-reassign */
import axios from 'axios';
import { toast } from 'react-toastify';

import { baseApi } from './constants';
import { getHeaders, setHeaders, clearHeaders } from './common';

export const instance = axios.create({
  baseURL: baseApi,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const header = getHeaders();
    if (header) {
      const {
        authorization,
      } = header;
      config.headers.authorization = authorization ? `Bearer ${authorization}` : '';
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const loginHandleError = (error) => {
  if (error?.response?.status === 401 || error?.response?.status === 422) {
    error.response?.data?.errors?.forEach((msg) => { toast.error(msg); });
  } else {
    toast.error('Server error. Please try again later');
  }
};

export const postRequest = async (url, body) => {
  const { data, headers } = await instance.post(url, body);
  return { data, headers };
};

export const signup = async (formData) => {
  const res = await postRequest('/users', formData);
  setHeaders(res.data.token);
  return res.data.data;
};

export const signIn = async (formData) => {
  const res = await postRequest('/login', formData);
  setHeaders(res.data.token);
  return res.data.data;
};

export const logOut = async () => {
  try {
    clearHeaders();
    toast.success('You have successfully logged out');
  } catch (error) {
    error.status = 500;
    loginHandleError(['An error ocurred']);
  }
};

export const fetchAppointments = async () => {
  try {
    const res = await instance.get('/appointments');
    return res.data;
  } catch (error) {
    return loginHandleError(error);
  }
};

export const fetchAppointment = async (id = 2) => {
  try {
    const res = await instance.get(`/appointments/${id}`);
    return res.data;
  } catch (error) {
    return loginHandleError(error);
  }
};

export const addMeasure = async (formData) => {
  try {
    const res = await postRequest('/measures', formData);
    return res.data;
  } catch (error) {
    return loginHandleError(error);
  }
};

export const createAppointment = async (formData) => {
  try {
    const res = await postRequest('/appointments', formData);

    return res.data;
  } catch (error) {
    console.log(error);
    return loginHandleError(error);
  }
};

export const getUser = async () => {
  try {
    const res = await instance.get('/me');
    return res.data;
  } catch (error) {
    return loginHandleError(error);
  }
};

export const getCars = async () => {
  try {
    const res = await instance.get('/cars');
    return res.data;
  } catch (error) {
    return loginHandleError(error);
  }
};

export const fetchCar = async (id) => {
  try {
    const res = await instance.get(`/cars/${id}`);
    return res.data;
  } catch (error) {
    return loginHandleError(error);
  }
};
