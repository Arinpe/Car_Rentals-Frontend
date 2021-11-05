import {
  setCar, setCars,
} from '../../reducers/carSlice';
import store from '../../store';

describe('Car Slice', () => {
  test('should set car in the store', async () => {
    const car = {
      id: 1,
      img_url: 'imageurl',
      price: '30000',
      horsepower: 75,
      model: 'RX300',
      make: 'Lexus'
    };

    expect(store.getState().car.car).toEqual({});
    store.dispatch(setCar(car));
    expect(store.getState().car.car).toEqual(car);
  });

  test('should set readings in the store', async () => {
    const cars = [{
      id: 2,
      img_url: 'imageurl',
      price: '30000',
      horsepower: 75,
      model: 'RX550',
      make: 'Lexus'
    }];

    store.dispatch(setCars(cars));
    expect(store.getState().car.cars).toEqual(cars);
  });
});
