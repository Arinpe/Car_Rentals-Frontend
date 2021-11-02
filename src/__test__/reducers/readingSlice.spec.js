import {
  setReading, setReadings,
} from '../../reducers/readingSlice';
import store from '../../store';

describe('Reading Slice', () => {
  test('should set reading in the store', async () => {
    const reading = {
      id: 1,
      user_id: 1,
      title: 'Weight',
      goal: 75,
      unit: 'kg',
    };

    expect(store.getState().user.user).toEqual({});
    store.dispatch(setReading(reading));
    expect(store.getState().measurement.measurement).toEqual(reading);
  });

  test('should set readings in the store', async () => {
    const readings = [{
      id: 1,
      user_id: 1,
      title: 'Weight',
      goal: 75,
      unit: 'kg',
    }];

    store.dispatch(setReadings(readings));
    expect(store.getState().measurement.measurements).toEqual(readings);
  });
});
