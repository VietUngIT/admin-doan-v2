
import { fromJS } from 'immutable';
import countDauReducer from '../reducer';

describe('countDauReducer', () => {
  it('returns the initial state', () => {
    expect(countDauReducer(undefined, {})).toEqual(fromJS({}));
  });
});
