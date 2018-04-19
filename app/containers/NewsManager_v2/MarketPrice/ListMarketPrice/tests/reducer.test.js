
import { fromJS } from 'immutable';
import listMarketPriceReducer from '../reducer';

describe('listMarketPriceReducer', () => {
  it('returns the initial state', () => {
    expect(listMarketPriceReducer(undefined, {})).toEqual(fromJS({}));
  });
});
