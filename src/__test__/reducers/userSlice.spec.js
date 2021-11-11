import {
  registerSuccess, loginSuccess,
} from '../../reducers/userSlice';
import store from '../../store';

describe('User Slice', () => {
  test('should set a registered user in the store', async () => {
    const user = {
      id: 1,
      provider: 'email',
      uid: 'team@ecomexperts.ca',
      allow_password_change: false,
      first_name: 'Ecom',
      last_name: 'Experts',
      username: 'walesdam',
    };

    expect(store.getState().user.user).toEqual({});
    store.dispatch(registerSuccess(user));
    expect(store.getState().user.user).toEqual(user);
  });

  test('should set a registered user in the store', async () => {
    const user = {
      id: 1,
      provider: 'email',
      uid: 'login',
      allow_password_change: false,
      first_name: 'Ecom',
      last_name: 'Experts',
      username: 'walesdam',
    };

    store.dispatch(loginSuccess(user));
    expect(store.getState().user.user).toEqual(user);
  });
});
