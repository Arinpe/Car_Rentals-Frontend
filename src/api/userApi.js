import { toast } from 'react-toastify';
import { handleResponse, handleError } from './apiUtils';

const baseUrl = `${process.env.REACT_APP_SERVER_API_URL}/users`;
const createFavouriteUrl = `${process.env.REACT_APP_SERVER_API_URL}/favourites`;

export default (body, token) => fetch(baseUrl, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(body),
})
  .then(handleResponse)
  .catch(handleError);

// eslint-disable-next-line camelcase
export const createFavourite = async (user_id, house_id, token) => {
  try {
    const response = await fetch(createFavouriteUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id, house_id }),
    });
    if (response.ok || response.status === 201) return toast.success('Favourite added successfully');
    throw new Error('Network response was not ok.');
  } catch (error) {
    return toast.error('Whoops!, You have added this house to Favourites');
  }
};
