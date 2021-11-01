import { handleResponse, handleError } from './apiUtils';

const baseUrl = `${process.env.REACT_APP_SERVER_API_URL}/houses`;
export const getHouses = token => fetch(baseUrl, {
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then(handleResponse)
  .catch(handleError);
export const getHouse = (id, token) => fetch(`${baseUrl}/${id}`, {
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then(handleResponse)
  .catch(handleError);
