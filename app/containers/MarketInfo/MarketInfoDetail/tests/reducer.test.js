
import { fromJS } from 'immutable';
import marketInfoDetailReducer from '../reducer';

describe('marketInfoDetailReducer', () => {
  it('returns the initial state', () => {
    expect(marketInfoDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
