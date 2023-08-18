import {
  setHeaders, getHeaders, clearHeaders, isToday, isDateInThisWeek, formatDate,
} from '../../services/common';
import { localStorageKey } from '../../services/constants';

describe('Should store request headers values', () => {
  const headers = {
    token: 'oioinoino', uid: 'effef', client: 'fewff', 'token-type': 'Bearer',
  };
  test('should save the  headers in localstorage', () => {
    setHeaders(headers);
    expect(localStorage.getItem(localStorageKey)).toBeTruthy();
    expect(localStorage.getItem(localStorageKey)).not.toBeFalsy();
  });

  test('should get the headers in localstorage', () => {
    const headers = {
      token: 'oioinoino', uid: 'effef', client: 'fewff', 'token-type': 'Bearer',
    };

    setHeaders(headers);
    const retrievedHeaders = getHeaders();
    expect(retrievedHeaders).toBeTruthy();
    expect(retrievedHeaders).not.toBeFalsy();
    expect(retrievedHeaders).not.toEqual({});
  });

  test('should clear the headers in localstorage', () => {
    const headers = {
      token: 'oioinoino', uid: 'effef', client: 'fewff', 'token-type': 'Bearer',
    };

    setHeaders(headers);
    clearHeaders();
    const retrievedHeaders = getHeaders();
    expect(retrievedHeaders).toBeFalsy();
    expect(retrievedHeaders).not.toEqual(headers);
  });

  test('should return true if today', () => {
    expect(isToday(new Date(), new Date())).toBe(true);
  });

  test('should false if not today', () => {
    expect(isToday(new Date(), new Date('1970/12/2'))).toBe(false);
  });

  test('should return true if day is in current week', () => {
    expect(isDateInThisWeek(new Date())).toBe(true);
  });

  test('should false if day is not day is in current week', () => {
    expect(isDateInThisWeek(new Date('1970/12/2'))).toBe(false);
  });

  test('should format Date', () => {
    const date = new Date();
    expect(formatDate(date)).not.toBe(date);
  });
});
