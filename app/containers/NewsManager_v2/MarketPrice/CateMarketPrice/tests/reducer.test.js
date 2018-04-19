
import { fromJS } from 'immutable';
import cateMarketPriceReducer from '../reducer';

describe('cateMarketPriceReducer', () => {
  it('returns the initial state', () => {
    expect(cateMarketPriceReducer(undefined, {})).toEqual(fromJS({}));
  });
});
