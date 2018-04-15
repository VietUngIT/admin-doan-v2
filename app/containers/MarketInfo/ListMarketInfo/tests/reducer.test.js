
import { fromJS } from 'immutable';
import listMarketInfoReducer from '../reducer';

describe('listMarketInfoReducer', () => {
  it('returns the initial state', () => {
    expect(listMarketInfoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
