import {
  logOut,
} from '../../services/request';
import {
  setHeaders, getHeaders,
} from '../../services/common';

describe('Logout', () => {
  test('should clear headers', async () => {
    setHeaders({ data: 'data' });
    logOut();
    const header = getHeaders();
    expect(header).toBeFalsy();
  });
});
