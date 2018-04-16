
import { fromJS } from 'immutable';
import cateMarketInfoReducer from '../reducer';

describe('cateMarketInfoReducer', () => {
  it('returns the initial state', () => {
    expect(cateMarketInfoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
