
import { fromJS } from 'immutable';
import ccuTabReducer from '../reducer';

describe('ccuTabReducer', () => {
  it('returns the initial state', () => {
    expect(ccuTabReducer(undefined, {})).toEqual(fromJS({}));
  });
});
