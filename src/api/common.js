const localStorageKey = 'carRentals';

export const getHeaders = () => (
  localStorage.getItem(localStorageKey) ? JSON.parse(localStorage.getItem(localStorageKey)) : null
);
export const setHeaders = (data) => localStorage.setItem(localStorageKey, JSON.stringify(data));

export const clearHeaders = () => localStorage.removeItem(localStorageKey);