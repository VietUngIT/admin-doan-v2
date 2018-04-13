
import { fromJS } from 'immutable';
import cashOutReducer from '../reducer';

describe('cashOutReducer', () => {
  it('returns the initial state', () => {
    expect(cashOutReducer(undefined, {})).toEqual(fromJS({}));
  });
});
