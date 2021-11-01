import { toast } from 'react-toastify';
import { handleResponse, handleError } from './apiUtils';

const baseUrl = `${process.env.REACT_APP_SERVER_API_URL}/users`;
const createAppointmentUrl = `${process.env.REACT_APP_SERVER_API_URL}/appointments`;

export const getUser = (body, token) => fetch(baseUrl, {
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
export const createAppointment = async (user_id, car_id, date, city, token) => {
  try {
    const response = await fetch(createAppointmentUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id,
        car_id,
        date,
        city,
      }),
    });
    if (response.ok || response.status === 201) return toast.success('appointment created successfully');
    throw new Error('Network response was not ok.');
  } catch (error) {
    return toast.error('Whoops!, it seems you have booked an appointment with this car');
  }
};
