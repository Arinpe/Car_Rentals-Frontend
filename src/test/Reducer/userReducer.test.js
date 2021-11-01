import UserReducer from '../../Reducer/userReducer';
import * as UserActions from '../../actions/userAction';

describe('User Reducer', () => {
  it('should update redux state user when passed SET_USER', () => {
    // arrange
    const initialState = {};
    const user = {
      username: 'Taiwo Coker',
      email: 'taiwofcoker@gmail.com',
    };
    const action = UserActions.loadUserSuccess(user);
    // act
    const newState = UserReducer(initialState, action);
    // assert
    expect(newState).toEqual(user);
  });
});
