
import { fromJS } from 'immutable';
import revenueReducer from '../reducer';

describe('revenueReducer', () => {
  it('returns the initial state', () => {
    expect(revenueReducer(undefined, {})).toEqual(fromJS({}));
  });
});
