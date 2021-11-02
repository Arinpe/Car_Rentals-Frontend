import { format, parseISO } from 'date-fns';
import { localStorageKey } from './constants';

export const getHeaders = () => (
  localStorage.getItem(localStorageKey) ? JSON.parse(localStorage.getItem(localStorageKey)) : null
);
export const setHeaders = (data) => {
  const { uid, client, expiry } = data;
  const body = {
    authorization: data['access-token'],
    tokenType: data['token-type'],
    uid,
    client,
    expiry,
  };
  localStorage.setItem(localStorageKey, JSON.stringify(body));
};
export const clearHeaders = () => localStorage.removeItem(localStorageKey);

export const isToday = (first, second) => first.getFullYear() === second.getFullYear()
&& first.getMonth() === second.getMonth()
&& first.getDate() === second.getDate();

export const isDateInThisWeek = (date) => {
  const todayObj = new Date();
  const todayDate = todayObj.getDate();
  const todayDay = todayObj.getDay();
  const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

  return date >= firstDayOfWeek && date <= lastDayOfWeek;
};

export const isYesterday = (date) => {
  const currentDate = new Date();
  const compareDate = new Date(date);
  return currentDate.getFullYear() === compareDate.getFullYear()
&& currentDate.getMonth() === compareDate.getMonth()
&& (currentDate.getDate() - 1) === compareDate.getDate();
};

export const formatDate = (date) => format(parseISO(new Date(date).toISOString()), 'MMM d yyyy');
