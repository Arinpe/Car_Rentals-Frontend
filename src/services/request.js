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
        authorization, uid, client, tokenType,
      } = header;
      config.headers['access-token'] = authorization || '';
      config.headers.uid = uid || '';
      config.headers.client = client || '';
      config.headers['token-type'] = tokenType || '';
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
  const res = await postRequest(`${baseApi}/auth`, formData);
  setHeaders(res.headers);
  return res.data.data;
};

export const signIn = async (formData) => {
  const res = await postRequest(`${baseApi}/auth/sign_in`, formData);
  setHeaders(res.headers);
  return res.data.data;
};

export const logOut = async () => {
  try {
    toast.success('You have successfully logged out');
    clearHeaders();
  } catch (error) {
    error.status = 500;
    loginHandleError(['An error ocurred']);
  }
};

export const fetchMeasurements = async () => {
  try {
    const res = await instance.get(`${baseApi}/measures`);
    return res.data;
  } catch (error) {
    return loginHandleError(error);
  }
};

export const fetchMeasurement = async (id = 2) => {
  try {
    const res = await instance.get(`${baseApi}/measures/${id}`);
    return res.data;
  } catch (error) {
    return loginHandleError(error);
  }
};

export const addMeasure = async (formData) => {
  try {
    const res = await postRequest(`${baseApi}/measures`, formData);
    return res.data;
  } catch (error) {
    return loginHandleError(error);
  }
};

export const addMeasurement = async (formData, id) => {
  try {
    const res = await postRequest(`${baseApi}/measures/${id}/new`, formData);
    return res.data;
  } catch (error) {
    return loginHandleError(error);
  }
};

export const getUser = async () => {
  try {
    const res = await instance.get(`${baseApi}/me`);
    return res.data;
  } catch (error) {
    return loginHandleError(error);
  }
};
