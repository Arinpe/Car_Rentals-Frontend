import FavouritesReducer from '../../Reducer/favouriteReducer';
import * as FavouritesActions from '../../actions/favouriteAction';

describe('Favourites Reducer', () => {
  it('should update redux state favourite when passed SET_FAVOURITE', () => {
    // arrange
    const initialState = [];
    const house = {
      id: 2,
      img_url:
        'https://find-your-house.herokuapp.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e3839d78d126019646746661364e5d12e8b14311/house11.jpg',
      name: 'Mill House',
      description:
        'Settled at the village of Firostefani, the all-white Mill Houses Elegant Suites features a swimming pool and offers rooms with verandas overlooking the building.',
    };
    const favourite = [house];
    const action = FavouritesActions.loadFavouritesSuccess(favourite);
    // act
    const newState = FavouritesReducer(initialState, action);
    // assert
    expect(newState.length).toEqual(1);
    expect(newState[0]).toEqual(house);
  });
});
